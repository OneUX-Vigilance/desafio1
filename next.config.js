const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTM = require('next-transpile-modules')(['react-bulma-components']);

module.exports = withCSS(withTM(withSass({
    webpack: (config) => {
      config.resolve.alias["@"] = __dirname
      config.resolve.modules.push('./pages')
      return config
    },
    env: {
      MAPBOX: process.env.MAPBOX
    },
})))