'use strict';

const parseIssueTemplate = require('./parse-issue-template');

// ==================================================

/**
 * Ensure specific texts used in expects are up-to-date with issue template.
 */
describe('parseIssueTemplate', () => {
  const updateRubyVersionFilePath =
    './.github/ISSUE_TEMPLATE/update-ruby-version.md';
  const RUBY_RELEASE_VERSION = '2.0';
  const RUBY_CURRENT_VERSION = '1.0';

  test('Parses issue template.', async () => {
    // Arrange

    // Act
    const issueTemplateInfo = await parseIssueTemplate(
      updateRubyVersionFilePath,
      {
        RUBY_RELEASE_VERSION,
        RUBY_CURRENT_VERSION,
      }
    );

    // Assert
    expect(issueTemplateInfo.name).toBe('Update Ruby Version');
    expect(issueTemplateInfo.about).toBe(
      'Used by bot to request updating the Ruby version ' +
        'of the Docker file in ghpages-docker repo.'
    );
    expect(issueTemplateInfo.title).toBe(
      'GHPAGES-DOCKER needs to be updated - Ruby'
    );
    expect(issueTemplateInfo.labels).toBe(
      'complexity: medium,' +
        'feature: docker,' +
        'role: DevOps Engineer,' +
        'role: Site Reliability Engineer,' +
        'size: 3pt'
    );
    expect(issueTemplateInfo.projects).toBe('CoP: DevOps: Project Board');
    expect(issueTemplateInfo.milestones).toBe(
      '06.02 Infrastructure - Org - Should have'
    );
    expect(issueTemplateInfo.body).toContain(
      `GitHub Pages is now using **v${RUBY_RELEASE_VERSION}** of Ruby. ` +
        `You are using **v${RUBY_CURRENT_VERSION}**.`
    );
    expect(issueTemplateInfo.body).toContain('Action Items');
  });

  test(
    'Parses issue template without providing ' + 'dynamic variable values.',
    async () => {
      // Arrange

      // Act
      const issueTemplateInfo = await parseIssueTemplate(
        updateRubyVersionFilePath,
        {}
      );

      // Assert
      expect(issueTemplateInfo.body).toContain(
        'GitHub Pages is now using **v???** of Ruby. ' +
          'You are using **v???**.'
      );
    }
  );

  test('Throws an error if variables argument is not given.', async () => {
    // Arrange

    // Act
    async function runFunc() {
      await parseIssueTemplate(updateRubyVersionFilePath);
    }

    // Assert
    await expect(runFunc).rejects.toThrow(
      'variables argument needs to be an Object.'
    );
  });

  test(
    'Throws a descriptive error message ' +
      'if issue template file is not found.',
    async () => {
      // Arrange
      const filePath = './.github/ISSUE_TEMPLATE/nonexistent.md';

      // Act
      async function runFunc() {
        await parseIssueTemplate(filePath, {
          RUBY_RELEASE_VERSION,
          RUBY_CURRENT_VERSION,
        });
      }

      // Assert
      await expect(runFunc).rejects.toThrow(
        `Issue template file not found: ${filePath}`
      );
    }
  );

  test(
    'Throws an error if the frontmatter section ' +
      'is missing in the issue template.',
    async () => {
      // Arrange
      const filePath =
        './github-actions/utils/test-parse-issue-template-missing-frontmatter.md';

      // Act
      async function runFunc() {
        await parseIssueTemplate(filePath, {
          RUBY_RELEASE_VERSION,
          RUBY_CURRENT_VERSION,
        });
      }

      // Assert
      await expect(runFunc).rejects.toThrow('Missing frontmatter section.');
    }
  );
});
