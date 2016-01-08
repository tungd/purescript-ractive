// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Profunctor = require("Data.Profunctor");
var Data_Profunctor_Strong = require("Data.Profunctor.Strong");
var Data_Tuple = require("Data.Tuple");
var Control_Arrow = require("Control.Arrow");
var Control_Plus = require("Control.Plus");
var Control_Alt = require("Control.Alt");
var Control_MonadPlus = require("Control.MonadPlus");
var Kleisli = function (x) {
    return x;
};
var semigroupoidKleisli = function (dictBind) {
    return new Prelude.Semigroupoid(function (v) {
        return function (v1) {
            return function (b) {
                return Prelude[">>="](dictBind)(v1(b))(v);
            };
        };
    });
};
var runKleisli = function (v) {
    return v;
};
var profunctorKleisli = function (dictFunctor) {
    return new Data_Profunctor.Profunctor(function (f) {
        return function (g) {
            return function (v) {
                return function ($32) {
                    return Prelude["<$>"](dictFunctor)(g)(v(f($32)));
                };
            };
        };
    });
};
var strongKleisli = function (dictFunctor) {
    return new Data_Profunctor_Strong.Strong(function () {
        return profunctorKleisli(dictFunctor);
    }, function (v) {
        return function (v1) {
            return Prelude["<$>"](dictFunctor)(function (v2) {
                return new Data_Tuple.Tuple(v2, v1.value1);
            })(v(v1.value0));
        };
    }, function (v) {
        return function (v1) {
            return Prelude["<$>"](dictFunctor)(Data_Tuple.Tuple.create(v1.value0))(v(v1.value1));
        };
    });
};
var categoryKleisli = function (dictMonad) {
    return new Prelude.Category(function () {
        return semigroupoidKleisli(dictMonad["__superclass_Prelude.Bind_1"]());
    }, Prelude["return"](dictMonad["__superclass_Prelude.Applicative_0"]()));
};
var arrowKleisli = function (dictMonad) {
    return new Control_Arrow.Arrow(function () {
        return strongKleisli(((dictMonad["__superclass_Prelude.Bind_1"]())["__superclass_Prelude.Apply_0"]())["__superclass_Prelude.Functor_0"]());
    }, function () {
        return categoryKleisli(dictMonad);
    });
};
var arrowZeroKleisli = function (dictMonadPlus) {
    return new Control_Arrow.ArrowZero(function () {
        return arrowKleisli(dictMonadPlus["__superclass_Prelude.Monad_0"]());
    }, function (v) {
        return Control_Plus.empty((dictMonadPlus["__superclass_Control.Alternative.Alternative_1"]())["__superclass_Control.Plus.Plus_1"]());
    });
};
var arrowPlusKleisli = function (dictMonadPlus) {
    return new Control_Arrow.ArrowPlus(function () {
        return arrowZeroKleisli(dictMonadPlus);
    }, function (f) {
        return function (g) {
            return function (a) {
                return Control_Alt["<|>"](((dictMonadPlus["__superclass_Control.Alternative.Alternative_1"]())["__superclass_Control.Plus.Plus_1"]())["__superclass_Control.Alt.Alt_0"]())(runKleisli(f)(a))(runKleisli(g)(a));
            };
        };
    });
};
module.exports = {
    Kleisli: Kleisli, 
    runKleisli: runKleisli, 
    semigroupoidKleisli: semigroupoidKleisli, 
    categoryKleisli: categoryKleisli, 
    profunctorKleisli: profunctorKleisli, 
    strongKleisli: strongKleisli, 
    arrowKleisli: arrowKleisli, 
    arrowZeroKleisli: arrowZeroKleisli, 
    arrowPlusKleisli: arrowPlusKleisli
};
