// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Control_Monad_ST = require("Control.Monad.ST");
var Data_Either = require("Data.Either");
var Data_Functor = require("Data.Functor");
var Data_Identity = require("Data.Identity");
var Control_Monad_Eff_Unsafe = require("Control.Monad.Eff.Unsafe");
var Data_Either_Unsafe = require("Data.Either.Unsafe");
var MonadRec = function (__superclass_Prelude$dotMonad_0, tailRecM) {
    this["__superclass_Prelude.Monad_0"] = __superclass_Prelude$dotMonad_0;
    this.tailRecM = tailRecM;
};
var tailRecM = function (dict) {
    return dict.tailRecM;
};
var tailRecM2 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return tailRecM(dictMonadRec)(function (o) {
                    return f(o.a)(o.b);
                })({
                    a: a,
                    b: b
                });
            };
        };
    };
};
var tailRecM3 = function (dictMonadRec) {
    return function (f) {
        return function (a) {
            return function (b) {
                return function (c) {
                    return tailRecM(dictMonadRec)(function (o) {
                        return f(o.a)(o.b)(o.c);
                    })({
                        a: a,
                        b: b,
                        c: c
                    });
                };
            };
        };
    };
};
var tailRecEff = function (f) {
    return function (a) {
        var f__ALT = function ($18) {
            return Control_Monad_Eff_Unsafe.unsafeInterleaveEff(f($18));
        };
        return function __do() {
            var v = f__ALT(a)();
            var v1 = {
                value: v
            };
            (function () {
                while (!(function __do() {
                    var v2 = v1.value;
                    return (function () {
                        if (v2 instanceof Data_Either.Left) {
                            return function __do() {
                                var v3 = f__ALT(v2.value0)();
                                v1.value = v3;
                                return Prelude["return"](Control_Monad_Eff.applicativeEff)(false)();
                            };
                        };
                        if (v2 instanceof Data_Either.Right) {
                            return Prelude["return"](Control_Monad_Eff.applicativeEff)(true);
                        };
                        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 75, column 1 - line 76, column 1: " + [ v2.constructor.name ]);
                    })()();
                })()) {

                };
                return {};
            })();
            return Prelude["<$>"](Control_Monad_Eff.functorEff)(Data_Either_Unsafe.fromRight)(Control_Monad_ST.readSTRef(v1))();
        };
    };
};
var tailRec = function (f) {
    return function (a) {
        var go = function (__copy_v) {
            var v = __copy_v;
            tco: while (true) {
                if (v instanceof Data_Either.Left) {
                    var __tco_v = f(v.value0);
                    v = __tco_v;
                    continue tco;
                };
                if (v instanceof Data_Either.Right) {
                    return v.value0;
                };
                throw new Error("Failed pattern match at Control.Monad.Rec.Class line 63, column 1 - line 64, column 1: " + [ v.constructor.name ]);
            };
        };
        return go(f(a));
    };
};
var monadRecIdentity = new MonadRec(function () {
    return Data_Identity.monadIdentity;
}, function (f) {
    return function ($19) {
        return Data_Identity.Identity(tailRec(function ($20) {
            return Data_Identity.runIdentity(f($20));
        })($19));
    };
});
var monadRecEff = new MonadRec(function () {
    return Control_Monad_Eff.monadEff;
}, tailRecEff);
var forever = function (dictMonadRec) {
    return function (ma) {
        return tailRecM(dictMonadRec)(function (u) {
            return Data_Functor["<$"]((((dictMonadRec["__superclass_Prelude.Monad_0"]())["__superclass_Prelude.Bind_1"]())["__superclass_Prelude.Apply_0"]())["__superclass_Prelude.Functor_0"]())(new Data_Either.Left(u))(ma);
        })(Prelude.unit);
    };
};
module.exports = {
    MonadRec: MonadRec,
    forever: forever,
    tailRecM3: tailRecM3,
    tailRecM2: tailRecM2,
    tailRecM: tailRecM,
    tailRec: tailRec,
    monadRecIdentity: monadRecIdentity,
    monadRecEff: monadRecEff
};