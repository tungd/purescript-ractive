// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Tuple = require("Data.Tuple");
var Data_Either = require("Data.Either");
var Data_Profunctor = require("Data.Profunctor");
var Data_Profunctor_Strong = require("Data.Profunctor.Strong");
var Data_Profunctor_Choice = require("Data.Profunctor.Choice");
var Star = function (x) {
    return x;
};
var runStar = function (v) {
    return v;
};
var profunctorStar = function (dictFunctor) {
    return new Data_Profunctor.Profunctor(function (f) {
        return function (g) {
            return function (v) {
                return Prelude[">>>"](Prelude.semigroupoidFn)(f)(Prelude[">>>"](Prelude.semigroupoidFn)(v)(Prelude.map(dictFunctor)(g)));
            };
        };
    });
};
var strongStar = function (dictFunctor) {
    return new Data_Profunctor_Strong.Strong(function () {
        return profunctorStar(dictFunctor);
    }, function (v) {
        return function (v1) {
            return Prelude.map(dictFunctor)(function (v2) {
                return new Data_Tuple.Tuple(v2, v1.value1);
            })(v(v1.value0));
        };
    }, function (v) {
        return function (v1) {
            return Prelude.map(dictFunctor)(Data_Tuple.Tuple.create(v1.value0))(v(v1.value1));
        };
    });
};
var choiceStar = function (dictApplicative) {
    return new Data_Profunctor_Choice.Choice(function () {
        return profunctorStar((dictApplicative["__superclass_Prelude.Apply_0"]())["__superclass_Prelude.Functor_0"]());
    }, function (v) {
        return Star(Data_Either.either(function ($26) {
            return Prelude.map((dictApplicative["__superclass_Prelude.Apply_0"]())["__superclass_Prelude.Functor_0"]())(Data_Either.Left.create)(v($26));
        })(function ($27) {
            return Prelude.pure(dictApplicative)(Data_Either.Right.create($27));
        }));
    }, function (v) {
        return Star(Data_Either.either(function ($28) {
            return Prelude.pure(dictApplicative)(Data_Either.Left.create($28));
        })(function ($29) {
            return Prelude.map((dictApplicative["__superclass_Prelude.Apply_0"]())["__superclass_Prelude.Functor_0"]())(Data_Either.Right.create)(v($29));
        }));
    });
};
module.exports = {
    Star: Star, 
    runStar: runStar, 
    profunctorStar: profunctorStar, 
    strongStar: strongStar, 
    choiceStar: choiceStar
};