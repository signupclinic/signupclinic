const baseConfig = require('../../jest.config.base');
const packageJson = require('./package');

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.tsx'],
  name: packageJson.name,
  displayName: packageJson.name,
};
