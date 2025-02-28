const { override, overrideDevServer } = require('customize-cra');

const devServerConfig = () => (config) => {
  return {
    ...config,
    allowedHosts: [
      'localhost', // Add any other hosts you want to allow
    ],
  };
};

module.exports = {
  webpack: override(
    // Add any webpack customizations here
  ),
  devServer: overrideDevServer(devServerConfig()),
};
