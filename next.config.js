/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
    return config;
  },
};

// module.exports = nextConfig;
// const { i18n } = require("./next-i18next.config");
// import i18n from "./next-i18next.config";
// const nextConfig = {
//   reactStrictMode: true,
//   i18n,
// };

module.exports = nextConfig;
