import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { FullConfig } from '@playwright/test';
import ts from 'typescript';
import {
  clearIntegrationSessionConfigurationMarker,
  validateIntegrationSessionConfiguration,
} from './integrationSessionConfiguration';
import { resolveIntegrationSessionUsers } from '../integration/helpers';
import * as playwrightConfigUtils from '../../playwright-config-utils';

type ResolveTagFilters = typeof import('../../playwright-config-utils').resolveTagFilters;

export function resolveTagFiltersExport(module: unknown): ResolveTagFilters {
  const exports = module as {
    resolveTagFilters?: ResolveTagFilters;
    default?: { resolveTagFilters?: ResolveTagFilters };
  };
  const resolveTagFilters = exports.resolveTagFilters ?? exports.default?.resolveTagFilters;
  if (!resolveTagFilters) {
    throw new TypeError('playwright-config-utils does not export resolveTagFilters');
  }
  return resolveTagFilters;
}

const resolveTagFilters = resolveTagFiltersExport(playwrightConfigUtils);
const require = createRequire(import.meta.url);
const minimatch = require('minimatch') as (
  filePath: string,
  pattern: string,
  options: { nocase: boolean; dot: boolean }
) => boolean;

type TestFilePattern = string | RegExp;
type TestFilePatterns = TestFilePattern | TestFilePattern[] | undefined;
type IntegrationTestProject = {
  testDir: string;
  testMatch?: TestFilePatterns;
  testIgnore?: TestFilePatterns;
};

function resolveIntegrationTestProjects(fullConfig: FullConfig): IntegrationTestProject[] {
  return fullConfig.projects
    .filter((project) => project.testDir.replace(/\\/g, '/').endsWith('playwright_tests_new/integration'))
    .map((project) => ({
      testDir: path.resolve(project.testDir),
      testMatch: project.testMatch,
      testIgnore: project.testIgnore,
    }));
}

function integrationTagsFromSource(source: string, fileName: string): { featureTags: string[]; hasSuiteTag: boolean } {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const tags = new Set<string>();
  let hasSuiteTag = false;

  const collectTagValues = (node: ts.Node): boolean => {
    if (ts.isStringLiteralLike(node) && node.text === '@integration') {
      hasSuiteTag = true;
      return true;
    }
    if (ts.isStringLiteralLike(node) && /^@integration-.+$/.test(node.text)) {
      tags.add(node.text);
      return true;
    }
    if (ts.isStringLiteralLike(node)) {
      return true;
    }
    if (ts.isArrayLiteralExpression(node)) {
      return node.elements.every((element) => !ts.isSpreadElement(element) && collectTagValues(element));
    }
    return false;
  };

  const failDynamicTag = (node: ts.Node): never => {
    const location = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    throw new Error(
      `Integration spec tag must be a static string or string array (${fileName}:${location.line + 1}:${location.character + 1})`
    );
  };

  const isTestDeclarationCall = (node: ts.CallExpression): boolean => {
    let expression: ts.Expression = node.expression;
    const members: string[] = [];
    while (ts.isPropertyAccessExpression(expression)) {
      members.unshift(expression.name.text);
      expression = expression.expression;
    }
    if (!ts.isIdentifier(expression) || expression.text !== 'test' || node.arguments.length < 3) {
      return false;
    }
    return members.length === 0 || members[0] === 'describe' || ['only', 'skip', 'fixme', 'fail'].includes(members[0]);
  };

  const validateOptions = (options: ts.Expression): void => {
    if (!ts.isObjectLiteralExpression(options)) {
      failDynamicTag(options);
    }
    for (const property of options.properties) {
      if (ts.isSpreadAssignment(property)) {
        failDynamicTag(property);
      }
      if (ts.isShorthandPropertyAssignment(property) && property.name.text === 'tag') {
        failDynamicTag(property);
      }
      if (ts.isComputedPropertyName(property.name)) {
        failDynamicTag(property.name);
      }
      if (ts.isPropertyAssignment(property)) {
        const propertyName =
          ts.isIdentifier(property.name) || ts.isStringLiteralLike(property.name) ? property.name.text : undefined;
        if (propertyName === 'tag' && !collectTagValues(property.initializer)) {
          failDynamicTag(property.initializer);
        }
      }
    }
  };

  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && isTestDeclarationCall(node)) {
      validateOptions(node.arguments[node.arguments.length - 2]);
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return { featureTags: [...tags], hasSuiteTag };
}

function matchesAnyPattern(filePath: string, patterns: TestFilePatterns, matchesWhenEmpty = false): boolean {
  const patternList = patterns === undefined ? [] : Array.isArray(patterns) ? patterns : [patterns];
  if (!patternList.length) {
    return matchesWhenEmpty;
  }
  return patternList.some((pattern) => {
    if (typeof pattern === 'string') {
      const normalizedPattern = pattern.startsWith('**/') ? pattern : `**/${pattern}`;
      return minimatch(filePath, normalizedPattern, { nocase: true, dot: true });
    }
    pattern.lastIndex = 0;
    return pattern.test(filePath);
  });
}

function integrationSpecFiles(testDir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(testDir, { withFileTypes: true })) {
    const entryPath = path.join(testDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...integrationSpecFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.spec.ts')) {
      files.push(entryPath);
    }
  }
  return files;
}

function selectedIntegrationSpecFiles(project: IntegrationTestProject): string[] {
  return integrationSpecFiles(project.testDir).filter(
    (specFile) => matchesAnyPattern(specFile, project.testMatch, true) && !matchesAnyPattern(specFile, project.testIgnore)
  );
}

export function validateIntegrationSpecTagCatalogue(
  testProjects: Array<string | IntegrationTestProject>,
  availableTags: string[],
  configPath: string
): void {
  const availableTagSet = new Set(availableTags);
  const missingTags = new Map<string, string[]>();
  const missingSuiteTagSpecs: string[] = [];
  const untaggedSpecs: string[] = [];

  const projects = testProjects.map((project) => (typeof project === 'string' ? { testDir: project } : project));
  for (const project of projects) {
    for (const specFile of selectedIntegrationSpecFiles(project)) {
      const source = fs.readFileSync(specFile, 'utf8');
      const { featureTags, hasSuiteTag } = integrationTagsFromSource(source, specFile);
      if (!hasSuiteTag) {
        missingSuiteTagSpecs.push(path.relative(process.cwd(), specFile));
      }
      if (featureTags.length === 0) {
        untaggedSpecs.push(path.relative(process.cwd(), specFile));
      }
      for (const tag of featureTags) {
        if (!availableTagSet.has(tag)) {
          const files = missingTags.get(tag) ?? [];
          files.push(path.relative(process.cwd(), specFile));
          missingTags.set(tag, files);
        }
      }
    }
  }

  if (missingTags.size > 0 || missingSuiteTagSpecs.length > 0 || untaggedSpecs.length > 0) {
    const details = [
      missingSuiteTagSpecs.length > 0
        ? `specs without a static @integration suite tag (${missingSuiteTagSpecs.join(', ')})`
        : undefined,
      untaggedSpecs.length > 0 ? `specs without a static @integration-* feature tag (${untaggedSpecs.join(', ')})` : undefined,
      missingTags.size > 0
        ? `feature tags missing from ${configPath}: ${[...missingTags]
            .map(([tag, files]) => `${tag} (${files.join(', ')})`)
            .join('; ')}`
        : undefined,
    ]
      .filter(Boolean)
      .join('; ');
    throw new Error(`Integration spec tag catalogue validation failed: ${details}`);
  }
}

function resolveIntegrationTagSelection(env: NodeJS.ProcessEnv) {
  return resolveTagFilters({
    env,
    includeTagsEnvVar: 'INTEGRATION_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'INTEGRATION_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: 'playwright_tests_new/integration/tag-filter.json',
    suiteTag: '@integration',
    globalExcludedTagsEnvVar: 'PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS',
    ignoreGlobalExcludesEnvVar: 'PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES',
    globalExcludedTagsPattern: /^@integration(?:-.+)?$/,
  });
}

export async function globalSetup(fullConfig: FullConfig) {
  const integrationTestProjects = resolveIntegrationTestProjects(fullConfig);
  if (integrationTestProjects.length === 0) {
    return;
  }

  // The marker is a success-only signal. Clear it before any validation that can fail.
  clearIntegrationSessionConfigurationMarker();
  const tagSelection = resolveIntegrationTagSelection(process.env);
  validateIntegrationSpecTagCatalogue(integrationTestProjects, tagSelection.availableTags, tagSelection.configPath);
  const userIdentifiers = resolveIntegrationSessionUsers(process.env, tagSelection);
  validateIntegrationSessionConfiguration(userIdentifiers);
}

export default globalSetup;
