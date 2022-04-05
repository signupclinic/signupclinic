const baseConfig = require('../../jest.config.base');
const packageJson = require('./package');

module.exports = {
  ...baseConfig,
  setupFiles: ['./setupTests.tsx'],
  testEnvironment: 'jsdom',
  name: packageJson.name,
  displayName: packageJson.name,
};
