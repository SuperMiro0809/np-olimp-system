const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@modules': 'src/modules',
  })(config);

  return config;
};