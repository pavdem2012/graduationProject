/** @type {import('jest').Config} */
const config = {
  testMatch: ['**/tests/api/**/*.spec.*'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports/jest/',
      filename: 'index.html',
      openReport: true
    }]
  ]
}

module.exports = config
