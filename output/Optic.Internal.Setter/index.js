// Generated by psc version 0.8.0.0
"use strict";
var Data_Distributive = require("Data.Distributive");
var Data_Identity = require("Data.Identity");
var Data_Profunctor = require("Data.Profunctor");
var Data_Traversable = require("Data.Traversable");
var Prelude = require("Prelude");
var Settable = function (__superclass_Data$dotDistributive$dotDistributive_1, __superclass_Data$dotTraversable$dotTraversable_2, __superclass_Prelude$dotApplicative_0, taintedDot, untainted, untaintedDot) {
    this["__superclass_Data.Distributive.Distributive_1"] = __superclass_Data$dotDistributive$dotDistributive_1;
    this["__superclass_Data.Traversable.Traversable_2"] = __superclass_Data$dotTraversable$dotTraversable_2;
    this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
    this.taintedDot = taintedDot;
    this.untainted = untainted;
    this.untaintedDot = untaintedDot;
};
var untaintedDot = function (dict) {
    return dict.untaintedDot;
};
var untainted = function (dict) {
    return dict.untainted;
};
var taintedDot = function (dict) {
    return dict.taintedDot;
};
var settableIdentity = new Settable(function () {
    return Data_Distributive.distributiveIdentity;
}, function () {
    return Data_Identity.traversableIdentity;
}, function () {
    return Data_Identity.applicativeIdentity;
}, function (dictProfunctor) {
    return Data_Profunctor.rmap(dictProfunctor)(Data_Identity.Identity);
}, function (v) {
    return v;
}, function (dictProfunctor) {
    return Data_Profunctor.rmap(dictProfunctor)(Data_Identity.runIdentity);
});
module.exports = {
    Settable: Settable, 
    taintedDot: taintedDot, 
    untaintedDot: untaintedDot, 
    untainted: untainted, 
    settableIdentity: settableIdentity
};
