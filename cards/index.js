const context = require.context('./', true, /\.card\.jsx?/);

context.keys().forEach(namespace => context(namespace));

if (module.hot)
  module.hot.accept();
