// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Profunctor = function (dimap) {
    this.dimap = dimap;
};
var profunctorFn = new Profunctor(function (a2b) {
    return function (c2d) {
        return function (b2c) {
            return Prelude[">>>"](Prelude.semigroupoidFn)(a2b)(Prelude[">>>"](Prelude.semigroupoidFn)(b2c)(c2d));
        };
    };
});
var dimap = function (dict) {
    return dict.dimap;
};
var lmap = function (dictProfunctor) {
    return function (a2b) {
        return dimap(dictProfunctor)(a2b)(Prelude.id(Prelude.categoryFn));
    };
};
var rmap = function (dictProfunctor) {
    return function (b2c) {
        return dimap(dictProfunctor)(Prelude.id(Prelude.categoryFn))(b2c);
    };
};
var arr = function (dictCategory) {
    return function (dictProfunctor) {
        return function (f) {
            return rmap(dictProfunctor)(f)(Prelude.id(dictCategory));
        };
    };
};
module.exports = {
    Profunctor: Profunctor, 
    arr: arr, 
    rmap: rmap, 
    lmap: lmap, 
    dimap: dimap, 
    profunctorFn: profunctorFn
};
