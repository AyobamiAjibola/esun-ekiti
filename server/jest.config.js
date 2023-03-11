/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  verbose: true,
  forceExit: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
      'ts-jest': {
        tsconfig: '<rootDir>/test/tsconfig.json',
      },
    }
  },
  moduleDirectories: ['node_modules', 'src'],
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  // },
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    "node_modules/(?!troublesome-dependency/.*)",
    // '<rootDir>/node_modules/'
  ],
};