import fs from 'node:fs';
import path from 'node:path';
import { FullConfig } from '@playwright/test';
import ts from 'typescript';
import { validateIntegrationSessionConfiguration } from './integrationSessionConfiguration';
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

function resolveIntegrationTestDirs(fullConfig: FullConfig): string[] {
  return fullConfig.projects
    .filter((project) => project.testDir.replace(/\\/g, '/').endsWith('playwright_tests_new/integration'))
    .map((project) => path.resolve(project.testDir));
}

function integrationFeatureTagsFromSource(source: string, fileName: string): string[] {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const tags = new Set<string>();

  const collectTagValues = (node: ts.Node): boolean => {
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
  return [...tags];
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

export function validateIntegrationSpecTagCatalogue(testDirs: string[], availableTags: string[], configPath: string): void {
  const availableTagSet = new Set(availableTags);
  const missingTags = new Map<string, string[]>();

  for (const testDir of new Set(testDirs)) {
    for (const specFile of integrationSpecFiles(testDir)) {
      const source = fs.readFileSync(specFile, 'utf8');
      for (const tag of integrationFeatureTagsFromSource(source, specFile)) {
        if (!availableTagSet.has(tag)) {
          const files = missingTags.get(tag) ?? [];
          files.push(path.relative(process.cwd(), specFile));
          missingTags.set(tag, files);
        }
      }
    }
  }

  if (missingTags.size > 0) {
    const details = [...missingTags].map(([tag, files]) => `${tag} (${files.join(', ')})`).join('; ');
    throw new Error(`Integration spec feature tags missing from ${configPath}: ${details}`);
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

async function globalSetup(fullConfig: FullConfig) {
  const integrationTestDirs = resolveIntegrationTestDirs(fullConfig);
  if (integrationTestDirs.length === 0) {
    return;
  }

  const tagSelection = resolveIntegrationTagSelection(process.env);
  validateIntegrationSpecTagCatalogue(integrationTestDirs, tagSelection.availableTags, tagSelection.configPath);
  const userIdentifiers = resolveIntegrationSessionUsers(process.env, tagSelection);
  validateIntegrationSessionConfiguration(userIdentifiers);
}

export default globalSetup;
