module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      '!src/**/*.spec.js'
    ],

    tests: [
      'src/**/*.spec.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    
  };
};