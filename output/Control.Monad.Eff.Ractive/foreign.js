"use strict";

// module Control.Monad.Eff.Ractive

var Ractive = require('ractive');

var get = function(selector){
  return function(ractive){
    return function(){
      var data = ractive.get(selector);
      return data;
    }
  }
}

var set = function(selector) {
   return function(value) {
     return function(ractive) {
       return function () {
         ractive.set(selector, value);
         return {};
     }
   }
  }
}

var ractive = function(settings){
    return function(){
      return new Ractive(settings);
    }
}

var on = function(event) {
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

var off = function(event){
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

var push = function(keypath){
  return function(value){
    return function(callback){
      var cb = createCallback('push', callback);
      return function(ractive){
        return function(){
          var ok = ractive.push(keypath, value).then(function(v){
            console.log('push, ractive promise: ' + v);
          }).catch(function(err){
            console.log('push failed, error: ' + err);
          });
          cb(ok)();
          return {};
        }
      }
    }
  }
}

var pop = function(keypath){
   return function(callback){
    var cb = createCallback('pop', callback);
    return function(ractive){
      return function(){
          var ok = ractive.pop(keypath).then(function(r){
                return r;
            }).catch(function(err){
              console.log('pop failed, error: ' + err);
          });
            cb(ok)();
          return {};
      };
   };
 };
}

var createCallback = function(api, callback){
  var cb = null;
  if(callback &&
       callback.constructor &&
       callback.constructor.name == 'Nothing'){
          cb = function(ignore){
            var ignr = ignore.then(function(){
              return {};
            }).catch(function(error){
              console.log(api + ' failed, error: ' + error);
            });
            var ret = function(){
              return ignr;
            };
            return ret;
      };
    }else{
      cb = function(val){
        return function(){
          val.then(function(v){
            callback.value0(v)();
          }).catch(function(err){
            console.log(err);
          });
          return {};
        }
      };
    }
    return cb;
};

module.exports = {
  get     : get,
  set     : set,
  on      : on,
  off     : off,
  push    : push,
  pop     : pop,
  ractive : ractive
}