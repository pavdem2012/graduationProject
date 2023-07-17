/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports/jest/',
      filename: 'index.html',
      openReport: true
    }]
  ],
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: [
    'jest-extended'
  ],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testMatch: ['**/src/tests/api/*.spec.*'],
  globals: {
    testTimeout: 50000
  },
  verbose: true
}
