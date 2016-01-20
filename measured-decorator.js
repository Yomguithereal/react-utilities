var measured = require('./dist/measured.js');

module.exports = function(opts) {
  return function(Component) {
    return measured(opts, Component);
  };
};
