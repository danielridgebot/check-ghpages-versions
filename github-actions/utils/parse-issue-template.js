const fs = require('fs');

// ==================================================

/**
 * Parses a markdown issue template.  A frontmatter section is required and has
 * to be between two '---' lines.  Variables within the issue template in '{{
 * }}' curly brackets are replaced with given arguments.
 *
 * The returned output can then be used to create a new GitHub issue, with `gh
 * issue create`.
 *
 * @param {string} filePath - Relative path to the issue template markdown file.
 * @param {object} variables - Contains the data for replacing the variables
 *  within the markdown file.  Keys must exactly match the names within '{{ }}'
 *  in the template.
 * @returns {object} Contains the frontmatter data and the body in key-value
 *  pairs.
 */
async function parseIssueTemplate(filePath, variables) {
  console.info('Parsing issue template.');
  console.debug('filePath = ' + filePath);
  console.debug('variables = ' + JSON.stringify(variables));

  if (typeof variables !== 'object') {
    throw Error('variables argument needs to be an Object.');
  }

  // Check file existence.
  if (!fs.existsSync(filePath)) {
    throw Error(`Issue template file not found: ${filePath}`);
  }

  console.info('Issue template found.');

  // Read file and save lines into an Array.
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);

  console.info('Issue template read.');

  // Extract YAML frontmatter between ---.
  const frontmatterStart = lines.indexOf('---');
  const frontmatterEnd = lines.indexOf('---', frontmatterStart + 1);
  if (frontmatterStart < 0 || frontmatterEnd < 0) {
    throw Error('Missing frontmatter section.');
  }
  const frontmatter = lines.slice(frontmatterStart + 1, frontmatterEnd);
  const body = lines
    .slice(frontmatterEnd + 1)
    .join('\n')
    .trim();

  console.info('Frontmatter and body separated.');

  const output = {};

  // Extract frontmatter keys and values.
  for (const line of frontmatter) {
    const ind = line.indexOf(':');
    const key = line.slice(0, ind);
    const unformattedValue = line.slice(ind + 1).trim();
    const value = unformattedValue.slice(1, unformattedValue.length - 1).trim();
    output[key] = value;
  }

  console.info('Parsed frontmatter data.');

  // Replace dynamic variables in body of issue template.
  output.body = body.replaceAll(/\{\{.*?\}\}/g, (match) => {
    const variable = match.slice(2, match.length - 2).trim();
    return variables[variable] ?? '???';
  });

  console.info('Replaced dynamic variables in body.');

  console.debug('output = ' + JSON.stringify(output));

  return output;
}

// ==================================================

module.exports = parseIssueTemplate;
