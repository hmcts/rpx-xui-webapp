
// in this file you can append custom step methods to 'I' object

console.log('[Hook] ✅ steps_file.js loaded in worker');

require('./hooks.js'); 

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

  });
};
