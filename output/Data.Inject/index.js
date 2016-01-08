// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Either = require("Data.Either");
var Data_Functor_Coproduct = require("Data.Functor.Coproduct");
var Data_Maybe = require("Data.Maybe");
var Inject = function (inj, prj) {
    this.inj = inj;
    this.prj = prj;
};
var prj = function (dict) {
    return dict.prj;
};
var injectReflexive = new Inject(Prelude.id(Prelude.categoryFn), Data_Maybe.Just.create);
var injectLeft = new Inject(function ($1) {
    return Data_Functor_Coproduct.Coproduct(Data_Either.Left.create($1));
}, Data_Functor_Coproduct.coproduct(Data_Maybe.Just.create)(Prelude["const"](Data_Maybe.Nothing.value)));
var inj = function (dict) {
    return dict.inj;
};
var injectRight = function (dictInject) {
    return new Inject(function ($2) {
        return Data_Functor_Coproduct.Coproduct(Data_Either.Right.create(inj(dictInject)($2)));
    }, Data_Functor_Coproduct.coproduct(Prelude["const"](Data_Maybe.Nothing.value))(prj(dictInject)));
};
module.exports = {
    Inject: Inject, 
    prj: prj, 
    inj: inj, 
    injectReflexive: injectReflexive, 
    injectLeft: injectLeft, 
    injectRight: injectRight
};
