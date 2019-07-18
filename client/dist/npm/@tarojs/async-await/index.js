// support for async functions

{
  var g = typeof window !== 'undefined' && window.Math === Math ? window : typeof global === 'object' ? global : this;

  if (!g.Promise) {
    g.Promise = require("../../promise-polyfill/lib/index.js");
  }
  if (!g.regeneratorRuntime) {
    g.regeneratorRuntime = require("../../regenerator-runtime/runtime.js");
  }
}