module.exports = {
  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js|jsx)': (filenames) => [
    'yarn lint',
    'yarn tsc',
    `yarn prettier --write ${filenames.join(' ')}`,
  ],
};
