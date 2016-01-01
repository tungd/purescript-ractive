"use strict";

// module Control.Monad.Eff.Ractive

exports.set = function set(selector) {
  //console.log('setting a value');
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