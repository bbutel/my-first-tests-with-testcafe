/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  testResultsProcessor: './node_modules/jest-junit-reporter',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/app/hotel/dataGenerator/**/*', '!**/index.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
}
