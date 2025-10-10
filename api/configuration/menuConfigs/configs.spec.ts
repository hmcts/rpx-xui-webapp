
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinonChai from 'sinon-chai';
import 'mocha';
import * as sinon from 'sinon';
import { setupMenuConfig } from './configs';
import * as baseConfigModule from './base-config';
import * as aatDiffsModule from './aat-diffs';

chai.use(sinonChai);

describe('Menu Configuration', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('setupMenuConfig', () => {
    let mockBaseConfig: any;
    let mockAatDifferences: any;

    beforeEach(() => {
      // Mock base configuration structure
      mockBaseConfig = {
        '(judge)|(judiciary)': [
          {
            text: 'My work',
            roles: ['caseworker-civil', 'caseworker-ia-iacjudge'],
            href: '/work/my-work/list',
            active: true
          },
          {
            text: 'Search',
            roles: ['caseworker-civil'],
            href: '/cases',
            active: false
          }
        ],
        '(pui-case-manager)': [
          {
            text: 'Case list',
            roles: ['pui-case-manager'],
            href: '/cases/case-filter',
            active: true
          }
        ]
      };

      // Mock AAT differences structure
      mockAatDifferences = {
        '(judge)|(judiciary)|(panelmember)': [
          {
            text: 'My work',
            roles: ['caseworker-sscs-judge', 'caseworker-sscs-panelmember']
          },
          {
            text: 'Search',
            roles: ['caseworker-sscs-judge']
          }
        ],
        '(pui-case-manager)': [
          {
            text: 'Notice of change',
            roles: ['caseworker-civil', 'caseworker-civil-solictor']
          }
        ],
        '.+': [
          {
            text: 'My work',
            roles: ['caseworker-sscs-clerk']
          }
        ]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(mockBaseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(mockAatDifferences);
    });

    describe('when environment is prod', () => {
      it('should return base config without modifications', () => {
        const result = setupMenuConfig('prod');

        expect(result).to.deep.equal(mockBaseConfig);
      });

      it('should not modify the original base config', () => {
        const originalBaseConfig = JSON.parse(JSON.stringify(mockBaseConfig));

        setupMenuConfig('prod');

        expect(baseConfigModule.baseConfig).to.deep.equal(originalBaseConfig);
      });
    });

    describe('when environment is aat', () => {
      it('should return merged config with role regex changes', () => {
        const result = setupMenuConfig('aat');

        // Should have the new regex key instead of old one
        expect(result).to.have.property('(judge)|(judiciary)|(panelmember)');
        expect(result).to.not.have.property('(judge)|(judiciary)');
      });

      it('should merge roles for existing items', () => {
        const result = setupMenuConfig('aat');

        const myWorkItem = result['(judge)|(judiciary)|(panelmember)'].find((item) => item.text === 'My work');
        expect(myWorkItem.roles).to.include.members([
          'caseworker-civil',
          'caseworker-ia-iacjudge',
          'caseworker-sscs-judge',
          'caseworker-sscs-panelmember'
        ]);
      });

      it('should add new items that do not exist in base config', () => {
        const result = setupMenuConfig('aat');

        const nocItem = result['(pui-case-manager)'].find((item) => item.text === 'Notice of change');
        expect(nocItem).to.exist;
        expect(nocItem.roles).to.deep.equal(['caseworker-civil', 'caseworker-civil-solictor']);
      });

      it('should add completely new regex keys from aat differences', () => {
        const result = setupMenuConfig('aat');

        expect(result).to.have.property('.+');
        expect(result['.+']).to.deep.equal(mockAatDifferences['.+']);
      });

      it('should preserve original base config structure', () => {
        const result = setupMenuConfig('aat');

        const myWorkItem = result['(judge)|(judiciary)|(panelmember)'].find((item) => item.text === 'My work');
        expect(myWorkItem.href).to.equal('/work/my-work/list');
        expect(myWorkItem.active).to.equal(true);
      });
    });

    describe('when environment is preview', () => {
      it('should return merged config like aat environment', () => {
        const aatResult = setupMenuConfig('aat');
        const previewResult = setupMenuConfig('preview');

        expect(previewResult).to.deep.equal(aatResult);
      });

      it('should apply role regex changes for preview environment', () => {
        const result = setupMenuConfig('preview');

        expect(result).to.have.property('(judge)|(judiciary)|(panelmember)');
        expect(result).to.not.have.property('(judge)|(judiciary)');
      });
    });

    describe('when environment is undefined or unknown', () => {
      it('should return undefined when environment is undefined', () => {
        const result = setupMenuConfig(undefined);

        expect(result).to.be.undefined;
      });

      it('should return undefined when environment is null', () => {
        const result = setupMenuConfig(null);

        expect(result).to.be.undefined;
      });

      it('should return undefined when environment is unknown string', () => {
        const result = setupMenuConfig('unknown');

        expect(result).to.be.undefined;
      });

      it('should return undefined when environment is empty string', () => {
        const result = setupMenuConfig('');

        expect(result).to.be.undefined;
      });
    });

    describe('edge cases', () => {
      it('should handle empty base config', () => {
        sandbox.stub(baseConfigModule, 'baseConfig').value({});

        const result = setupMenuConfig('aat');

        expect(result).to.deep.equal(mockAatDifferences);
      });

      it('should handle empty aat differences', () => {
        sandbox.stub(aatDiffsModule, 'aatDifferences').value({});

        const result = setupMenuConfig('aat');

        // Should still apply role regex changes but no merging
        expect(result).to.have.property('(judge)|(judiciary)|(panelmember)');
        expect(result).to.not.have.property('(judge)|(judiciary)');
      });

      it('should handle base config with no matching regex keys', () => {
        const baseConfigWithoutJudge = {
          '(admin)': [{ text: 'Admin panel', roles: ['admin'] }]
        };
        sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfigWithoutJudge);

        const result = setupMenuConfig('aat');

        expect(result).to.have.property('(admin)');
        expect(result).to.have.property('(judge)|(judiciary)|(panelmember)');
      });
    });
  });

  describe('replaceRolesRegex (internal function)', () => {
    let replaceRolesRegex: any;

    beforeEach(() => {
      // Since replaceRolesRegex is not exported, we need to test it indirectly through setupMenuConfig
      // or we can access it through the module if we need direct testing
      const configsModule = require('./configs');
      replaceRolesRegex = configsModule.replaceRolesRegex;
    });

    it('should replace existing regex keys', () => {
      const testConfig = {
        '(judge)|(judiciary)': [{ text: 'Test', roles: ['test-role'] }],
        'other-key': [{ text: 'Other', roles: ['other-role'] }]
      };
      const rolesRegexChanges = {
        '(judge)|(judiciary)': '(judge)|(judiciary)|(panelmember)'
      };

      // Test through setupMenuConfig since replaceRolesRegex is internal
      sandbox.stub(baseConfigModule, 'baseConfig').value(testConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value({});

      const result = setupMenuConfig('aat');

      expect(result).to.have.property('(judge)|(judiciary)|(panelmember)');
      expect(result).to.not.have.property('(judge)|(judiciary)');
      expect(result).to.have.property('other-key');
    });

    it('should handle non-existent regex keys gracefully', () => {
      const testConfig = {
        'existing-key': [{ text: 'Test', roles: ['test-role'] }]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(testConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value({});

      const result = setupMenuConfig('aat');

      expect(result).to.have.property('existing-key');
      expect(result).to.not.have.property('(judge)|(judiciary)|(panelmember)');
    });
  });

  describe('mergeConfigs (internal function)', () => {
    it('should merge roles for items with same text', () => {
      const baseConfig = {
        'test-key': [
          {
            text: 'My work',
            roles: ['role1', 'role2'],
            href: '/work',
            active: true
          }
        ]
      };

      const aatDiffs = {
        'test-key': [
          {
            text: 'My work',
            roles: ['role3', 'role4']
          }
        ]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(aatDiffs);

      const result = setupMenuConfig('aat');

      const mergedItem = result['test-key'].find((item) => item.text === 'My work');
      expect(mergedItem.roles).to.include.members(['role1', 'role2', 'role3', 'role4']);
      expect(mergedItem.href).to.equal('/work');
      expect(mergedItem.active).to.equal(true);
    });

    it('should add new items when no matching text found', () => {
      const baseConfig = {
        'test-key': [
          {
            text: 'My work',
            roles: ['role1'],
            href: '/work'
          }
        ]
      };

      const aatDiffs = {
        'test-key': [
          {
            text: 'New item',
            roles: ['role2']
          }
        ]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(aatDiffs);

      const result = setupMenuConfig('aat');

      expect(result['test-key']).to.have.length(2);
      expect(result['test-key'].find((item) => item.text === 'New item')).to.exist;
    });

    it('should create new keys when they do not exist in base config', () => {
      const baseConfig = {
        'existing-key': [{ text: 'Existing', roles: ['role1'] }]
      };

      const aatDiffs = {
        'new-key': [{ text: 'New', roles: ['role2'] }]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(aatDiffs);

      const result = setupMenuConfig('aat');

      expect(result).to.have.property('existing-key');
      expect(result).to.have.property('new-key');
      expect(result['new-key']).to.deep.equal(aatDiffs['new-key']);
    });

    it('should remove duplicate roles when merging', () => {
      const baseConfig = {
        'test-key': [
          {
            text: 'My work',
            roles: ['role1', 'role2'],
            href: '/work'
          }
        ]
      };

      const aatDiffs = {
        'test-key': [
          {
            text: 'My work',
            roles: ['role2', 'role3'] // role2 is duplicate
          }
        ]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(aatDiffs);

      const result = setupMenuConfig('aat');

      const mergedItem = result['test-key'].find((item) => item.text === 'My work');
      expect(mergedItem.roles).to.have.length(3);
      expect(mergedItem.roles).to.include.members(['role1', 'role2', 'role3']);
    });

    it('should handle items without roles property', () => {
      const baseConfig = {
        'test-key': [
          {
            text: 'My work',
            roles: ['role1'],
            href: '/work'
          }
        ]
      };

      const aatDiffs = {
        'test-key': [
          {
            text: 'No roles item'
            // No roles property
          }
        ]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(aatDiffs);

      const result = setupMenuConfig('aat');

      expect(result['test-key']).to.have.length(2);
      expect(result['test-key'].find((item) => item.text === 'No roles item')).to.exist;
    });

    it('should handle base items without roles property', () => {
      const baseConfig = {
        'test-key': [
          {
            text: 'My work',
            href: '/work'
            // No roles property
          }
        ]
      };

      const aatDiffs = {
        'test-key': [
          {
            text: 'My work',
            roles: ['role1']
          }
        ]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(aatDiffs);

      const result = setupMenuConfig('aat');

      // Should add new item since base item has no roles property
      expect(result['test-key']).to.have.length(2);
    });

    it('should handle empty arrays in config', () => {
      const baseConfig = {
        'test-key': []
      };

      const aatDiffs = {
        'test-key': [
          {
            text: 'New item',
            roles: ['role1']
          }
        ]
      };

      sandbox.stub(baseConfigModule, 'baseConfig').value(baseConfig);
      sandbox.stub(aatDiffsModule, 'aatDifferences').value(aatDiffs);

      const result = setupMenuConfig('aat');

      expect(result['test-key']).to.have.length(1);
      expect(result['test-key'][0].text).to.equal('New item');
    });
  });
});
