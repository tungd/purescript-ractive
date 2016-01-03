"use strict";

// module Control.Monad.Eff.Ractive

var Ractive = require('ractive');

function get(selector){
  return function(ractive){
    return function(){
      var data = ractive.get(selector);
      return data;
    }
  }
}

function set(selector) {
   return function(value) {
     return function(ractive) {
       return function () {
         ractive.set(selector, value);
         return {};
     }
   }
  }
}

function ractive(settings){
    return function(){
      return new Ractive(settings);
    }
}

function on(event) {
 return function(handler) {
   return function(ractive) {
     return function() {
       var cancellable = ractive.on(event, function(ev){
          return handler(this)(ev)();
       });
       return cancellable;
     }
   }
 }
}

function off(event){
  return function(handler){
    return function(ractive){
      return function(){
        var chainable = null;
        if(event.constructor.name == 'Just' &&
            handler.constructor.name == 'Nothing'){
          chainable = ractive.off(event.value0);
        }else if(event.constructor.name == 'Nothing'){
          chainable = ractive.off();
        }else{
          chainable = ractive.off(event.value0,handler.constructor());
        }
        return chainable;
      }
    }
  }
}

module.exports = {
  get: get,
  set: set,
  on: on,
  off: off,
  ractive: ractive
}