/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      require('unplugin-icons/webpack')({
        compiler: 'jsx',
        jsx: 'react',
      }),
    );

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sentry: {
    hideSourceMaps: true,
  },
}

const sentryWebpackPluginOptions = {
  // silent: true,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(withPWA(nextConfig), sentryWebpackPluginOptions);