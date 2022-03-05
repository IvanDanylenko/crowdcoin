const nextJest = require('next/jest');

const createJestConfig = nextJest();

const customJestConfig = {
  displayName: 'ethereum',
  testEnvironment: 'node',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
