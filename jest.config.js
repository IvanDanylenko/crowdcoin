const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test runs
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
  moduleNameMapper: {
    // Handle assets import
    // @see https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/config/jest/mocks/fileMock.js',

    // Resolve module aliases as in tsconfig.json
    '^@atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
    '^@molecules/(.*)$': '<rootDir>/src/components/molecules/$1',
    '^@organisms/(.*)$': '<rootDir>/src/components/organisms/$1',
    '^@templates/(.*)$': '<rootDir>/src/components/templates/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/ethereum/'],
  // Disable watchers for not relevant modules
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

  // Ethereum tests require different configuration
  projects: ['<rootDir>', '<rootDir>/ethereum/jest.config.js'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
