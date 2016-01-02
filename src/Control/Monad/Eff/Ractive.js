"use strict";

// module Control.Monad.Eff.Ractive

var Ractive = require('ractive');

exports.set = function set(selector) {
   return function(value) {
     return function(ractive) {
       return function () {
         ractive.set(selector, value);
         return {};
     }
   }
  }
};

exports.ractive = function(settings){
    return function(){
      return new Ractive(settings);
    }
};