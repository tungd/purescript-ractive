"use strict";

// module Control.Monad.Eff.Ractive

// TODO: this works with Bower on browser, need to test with Node/Browserify
// try {
//   var Ractive = require('ractive');
// } catch (e) {
// }

//-- an ugly helper function for wiring up of callbacks
// used in push/pop APIs
var createCallback = function(api, callback){
  var cb = null;
  if(!callback){
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
  } else {
    cb = function(val){
      return function(){
        val.then(function(v){
          if(typeof callback.value0 === 'function'){
            callback.value0(v)();
          }else if(typeof callback === 'function'){
            callback(v)();
          }
        }).catch(function(err){
          console.log(err);
        });
        return {};
      }
    };
  }
  return cb;
};
// -- end of ugly helper function

// -- extract Ractive component settings

var extractSettings = function(settings){
  return settings.value0;
}

// -- end of extract Ractive component settings

var observe = function(selector){
  return function(handler){
    return function(options){
      return function(ractive){
        return function(){
          var cancellable = null;
          if(options){
            cancellable = ractive.observe(selector, function(n,o,kp){
              return handler(n)(o)(kp)(this);
            }, options);
          }else{
            cancellable = ractive.observe(selector, function(n,o,kp){
              return handler(n)(o)(kp)(this);
            });
          }

          return cancellable;
        };
      };
    };
  };
};

var observeOnce = function(selector){
  return function(handler){
    return function(options){
      return function(ractive){
        return function(){
          var cancellable = null;
          if(options){
            cancellable = ractive.observeOnce(selector, function(n,o,kp){
              return handler(n)(o)(kp)(this);
            }, options);
          }else{
            cancellable = ractive.observeOnce(selector, function(n,o,kp){
              return handler(n)(o)(kp)(this);
            });
          }

          return cancellable;
        };
      };
    };
  };
}

var get = function(selector){
  return function(ractive){
    return function(){
      return ractive.get(selector) || null;
    };
  };
};

var set = function(selector) {
  return function(value) {
    return function(ractive) {
      return function () {
        ractive.set(selector, value);
        return {};
      };
    };
  };
};

var on = function(event) {
  return function(handler) {
    return function(ractive) {
      return function() {
        var cancellable = ractive.on(event, function(ev){
          return handler(ev);
        });
        return cancellable || null;
      };
    };
  };
};

var off = function(event){
  return function(handler){
    return function(ractive){
      return function(){
        var cancellable = null;
        if (event) {
          cancellable = ractive.off(event);
        } else {
          cancellable = ractive.off();
        }

        return cancellable;
      };
    };
  };
};

var push = function(keypath){
  return function(value){
    return function(callback){
      var cb = createCallback('push', callback);
      return function(ractive){
        return function(){
          var ok = ractive.push(keypath, value).then(function(v){
            // console.log('push, ractive promise: ' + v);
          }).catch(function(err){
            console.log('push failed, error: ' + err);
          });
          cb(ok)();
          return {};
        };
      };
    };
  };
};

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
};

var find = function(selector){
  return function(ractive){
    return function(){
      return ractive.find(selector) || null;
    };
  };
};

var findAll = function(selector){
  return function(options){
    return function(ractive){
      return function(){
        var elements = null;
        if(!options){
          elements = ractive.findAll(selector);
        }else{
          elements = ractive.findAll(selector, options.value0);
        }

        return elements;
      };
    };
  };
};

var add = function(keypath){
  return function(number){
    var num = number || 1;
    return function(callback){
      var cb = createCallback('add', callback);
      return function(ractive){
        return function(){
          var ok = ractive.add(keypath, num).then(function(r){
            return r;
          }).catch(function(err){
            console.log('add failed, error: ' + err);
          });
          cb(ok)();
          return {};
        };
      };
    };
  };
};

var subtract = function(keypath){
  return function(number){
    var num = number || 1;
    return function(callback){
      var cb = createCallback('subtract', callback);
      return function(ractive){
        return function(){
          var ok = ractive.subtract(keypath, num).then(function(r){
            return r;
          }).catch(function(err){
            console.log('subtract failed, error: ' + err);
          });
          cb(ok)();
          return {};
        };
      };
    };
  };
};

var findComponent = function(name) {
  return function(ractive) {
    return function() {
      return ractive.findComponent(name) || null;
    }
  };
};

var findAllComponents = function(name){
  return function(options){
    return function(ractive){
      return function(){
        var allComponents = null;
        if(options){
          allComponents = ractive.findAllComponents(name, options);
        }else{
          allComponents = ractive.find(name);
        }
        return allComponents;
      };
    };
  };
};

var findContainer = function(name){
  return function(ractive){
    var container = null;
    if(name){
      container = ractive.findContainer(name);
    }
    return container;
  };
};

var findParent = function(name){
  return function(ractive){
    return ractive.findParent(name) || null;
  };
};

var animate = function(keypath){
  return function(value){
    return function(options){
      return function(ractive){
        return function(){
          if(options){
            ractive.animate(keypath,value,options).then(function(){

            }).catch(function(err){
              console.log('animate failed, error: ' + err);
            });
          }else{
            ractive.animate(keypath, value).then(function(){

            }).catch(function(err){
              console.log('animate failed, error: ' + err);
            });
          }
          return {};
        };
      };
    };
  };
};

var insert = function(ractive) {
  return function(target){
    return function(anchor){
      return function(){
        if(anchor){
          ractive.insert(target.value0, anchor.value0);
        }else {
          ractive.insert(target.value0);
        }
        return {};
      };
    };
  };
};

var detach = function(ractive){
  return function(){
    return ractive.detach() || null;
  };
};

var fire = function(eventName){
  return function(args){
    return function(ractive){
      return function(){
        if(args){
          ractive.fire(eventName, args.value0);
        }else{
          ractive.fire(eventName);
        }
        return {};
      };
    };
  };
};

var render = function(target){
  return function(ractive){
    return function(){
      ractive.render(target.value0);
      return {};
    };
  };
};

var reset = function(data){
  return function(callback){
    var cb = createCallback('reset', callback);
    return function(ractive){
      return function(){
        var ok = null;
        if(data){
          ok = ractive.reset(data.value0).then(function(r){
            return r;
          }).catch(function(err){
            console.log('reset failed, error: ' + err);
          });
        }else{
          ok = ractive.reset().then(function(r){
            return r;
          }).catch(function(err){
            console.log('reset failed, error: ' + err);
          });
        }
        cb(ok)();
        return {};
      };
    };
  };
};

var resetPartial = function(name){
  return function(partial){
    return function(callback){
      var cb = createCallback('resetPartial', callback);
      return function(ractive){
        return function(){
          var ok = ractive.resetPartial(name, partial.value0).then(function(r){
            return r;
          }).catch(function(err){
            console.log('resetPartial failed, error: ' + err);
          });
          cb(ok)();
          return {};
        };
      };
    };
  };
};

var shift = function(keypath){
  return function(callback){
    var cb = createCallback('shift', callback);
    return function(ractive){
      return function(){
        var ok = ractive.shift(keypath);
        cb(ok)();
        return {};
      };
    };
  };
};

var splice = function(keypath){
  return function(index){
    return function(removeCount){
      return function(add){
        return function(callback){
          var cb = createCallback('splice', callback);
          return function(ractive){
            return function(){
              var ok = null;
              if(add){
                ok = ractive.splice(keypath, index, removeCount, add.value0).then(function(r){
                  return r;
                }).catch(function(err){
                  console.log('splice failed, error: ' + err);
                });
              }else{
                ok = ractive.splice(keypath, index, removeCount, []).then(function(r){
                  return r;
                }).catch(function(err){
                  console.log('splice failed, error: ' + err);
                });
              }
              cb(ok)();
              return {};
            };
          };
        };
      };
    };
  };
};

var teardown = function(callback){
  var cb = createCallback('teardown', callback);
  return function(ractive){
    return function(){
      var ok = ractive.teardown();
      cb(ok)();
      return {};
    };
  };
};

var toggle = function(keypath){
  return function(callback){
    var cb = createCallback('toggle', callback);
    return function(ractive){
      return function(){
        var ok = ractive.toggle(keypath).then(function(r){
          return r;
        }).catch(function(err){
          console.log('toggle failed, error: ' + err);
        });
        cb(ok)();
        return {};
      };
    };
  };
};

var toHTML = function(ractive){
  return function(){
    return ractive.toHTML() || null;
  };
};

var unrender = function(callback){
  var cb = createCallback('unrender', callback);
  return function(ractive){
    return function(){
      var ok = ractive.unrender().then(function(r){
        return r;
      }).catch(function(err){
        console.log('unrender failed, error: ' + err);
      });
      cb(ok)();
      return {};
    };
  };
};

var unshift = function(keypath){
  return function(value){
    return function(callback){
      var cb = createCallback('unshift', callback);
      return function(ractive){
        return function(){
          var ok = ractive.unshift(keypath, value).then(function(r){
            return r;
          }).catch(function(err){
            console.log('reset failed, error: ' + err);
          });
          cb(ok)();
          return {};
        };
      };
    };
  };
};

var update = function(keypath){
  return function(callback){
    var cb = createCallback('update', callback);
    return function(ractive){
      return function(){
        var ok = null;
        if(keypath){
          ok = ractive.update(keypath).then(function(r){
            return r;
          }).catch(function(err){
            console.log('update failed, error: ' + err);
          });
        }else{
          ok = ractive.update().then(function(r){
            return r;
          }).catch(function(err){
            console.log('update failed, error: ' + err);
          });
        }
        cb(ok)();
        return {};
      };
    };
  };
};

var updateModel = function(keypath){
  return function(cascade){
    return function(callback){
      var cb = createCallback('updateModel', callback);
      return function(ractive){
        return function(){
          var cas = null;
          var ok = null;
          if(cascade){
            cas = cascade.value0;
          }
          if(keypath){
            if(cas){
              ok = ractive.updateModel(keypath.value0, cas).then(function(r){
                return r;
              }).catch(function(err){
                console.log('updateModel failed, error: ' + err);
              });
            }else{
              ok = ractive.updateModel(keypath.value0).then(function(r){
                return r;
              }).catch(function(err){
                console.log('updateModel failed, error: ' + err);
              });
            }
          }else{
            ok = ractive.updateModel().then(function(r){
              return r;
            }).catch(function(err){
              console.log('updateModel failed, error: ' + err);
            });
          }
          cb(ok)();
          return {};
        };
      };
    };
  };
};

var ractive = function(settings){
  return function(){
    var s = extractSettings(settings);
    return new Ractive(s);
  };
};

var extend = function(settings){
  return function(){
    var s = extractSettings(settings);
    var r = Ractive.extend(s);
    return r;
  };
}

/* HELPERS */

var logRaw = function(str) {
  return function () {
    console.log(str);
    return {};
  };
};

module.exports = {
  /****** BEGIN API ******/
  get               : get,
  set               : set,
  on                : on,
  off               : off,
  push              : push,
  pop               : pop,
  observe           : observe,
  observeOnce       : observeOnce,
  find              : find,
  findAll           : findAll,
  findAllComponents : findAllComponents,
  findComponent     : findComponent,
  findContainer     : findContainer,
  findParent        : findParent,
  add               : add,
  subtract          : subtract,
  ractive           : ractive,
  extend            : extend,
  animate           : animate,
  insert            : insert,
  detach            : detach,
  fire              : fire,
  render            : render,
  reset             : reset,
  resetPartial      : resetPartial,
  shift             : shift,
  splice            : splice,
  teardown          : teardown,
  toggle            : toggle,
  toHTML            : toHTML,
  unrender          : unrender,
  unshift           : unshift,
  update            : update,
  updateModel       : updateModel,
  /********** END API *************/
  logRaw            : logRaw
}
