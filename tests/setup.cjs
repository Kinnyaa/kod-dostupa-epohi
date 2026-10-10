const fs = require('node:fs');
const babel = require('@babel/core');
const originalJavaScriptLoader = require.extensions['.js'];

require.extensions['.js'] = (module, filename) => {
  if (filename.includes('node_modules')) {
    originalJavaScriptLoader(module, filename);
    return;
  }
  const source = fs.readFileSync(filename, 'utf8');
  const { code } = babel.transformSync(source, {
    filename,
    presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }]],
    sourceMaps: 'inline',
  });
  module._compile(code, filename);
};

const memory = new Map();
global.window = {
  localStorage: {
    getItem: (key) => memory.get(key) ?? null,
    setItem: (key, value) => memory.set(key, String(value)),
    removeItem: (key) => memory.delete(key),
    clear: () => memory.clear(),
  },
};

module.exports = { memory };
