import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    // By building from distribution file, we can avoid
    //   some fragility, since the only based-in dep. now
    //   is popper.js
    // This is the file pointed to by tippy.js' `module`
    //   in `package.json`, so we could check for that
    //   and import that instead, but if that ever ends
    //   up needing more build steps than this dist
    //   file, it could require more work than this.
    input: 'node_modules/tippy.js/dist/tippy.esm.js',
    output: {
      banner: 'var process = {env: {NODE_ENV: "production"}}',
      format: 'esm',
      file: 'data/vendor/tippy.js/tippy.esm.js'
    },
    plugins: [resolve()]
  }
];
