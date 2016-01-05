// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Char = require("Data.Char");
var Data_Either = require("Data.Either");
var Data_Maybe = require("Data.Maybe");
var Data_Maybe_Unsafe = require("Data.Maybe.Unsafe");
var Data_Tuple = require("Data.Tuple");
var Data_Unfoldable = require("Data.Unfoldable");
var Cardinality = function (x) {
    return x;
};
var Enum = function (__superclass_Prelude$dotBounded_0, cardinality, fromEnum, pred, succ, toEnum) {
    this["__superclass_Prelude.Bounded_0"] = __superclass_Prelude$dotBounded_0;
    this.cardinality = cardinality;
    this.fromEnum = fromEnum;
    this.pred = pred;
    this.succ = succ;
    this.toEnum = toEnum;
};
var toEnum = function (dict) {
    return dict.toEnum;
};
var succ = function (dict) {
    return dict.succ;
};
var runCardinality = function (v) {
    return v;
};
var tupleCardinality = function (dictEnum) {
    return function (dictEnum1) {
        return function (l) {
            return function (r) {
                return Cardinality(runCardinality(l) * runCardinality(r) | 0);
            };
        };
    };
};
var tupleToEnum = function (dictEnum) {
    return function (dictEnum1) {
        return function (cardb) {
            return function (n) {
                return Prelude["<*>"](Data_Maybe.applyMaybe)(Prelude["<$>"](Data_Maybe.functorMaybe)(Data_Tuple.Tuple.create)(toEnum(dictEnum)(n / runCardinality(cardb) | 0)))(toEnum(dictEnum1)(n % runCardinality(cardb)));
            };
        };
    };
};
var pred = function (dict) {
    return dict.pred;
};
var maybeCardinality = function (dictEnum) {
    return function (c) {
        return Cardinality(1 + runCardinality(c) | 0);
    };
};
var maybeToEnum = function (dictEnum) {
    return function (carda) {
        return function (n) {
            if (n <= runCardinality(maybeCardinality(dictEnum)(carda))) {
                var $36 = n === 0;
                if ($36) {
                    return Data_Maybe.Just.create(Data_Maybe.Nothing.value);
                };
                if (!$36) {
                    return Data_Maybe.Just.create(toEnum(dictEnum)(n - 1));
                };
                throw new Error("Failed pattern match at Data.Enum line 138, column 1 - line 139, column 1: " + [ $36.constructor.name ]);
            };
            return Data_Maybe.Nothing.value;
        };
    };
};
var intStepFromTo = function (step) {
    return function (from) {
        return function (to) {
            return Data_Unfoldable.unfoldr(Data_Unfoldable.unfoldableArray)(function (e) {
                var $37 = e <= to;
                if ($37) {
                    return Data_Maybe.Just.create(new Data_Tuple.Tuple(e, e + step | 0));
                };
                if (!$37) {
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Data.Enum line 103, column 1 - line 104, column 1: " + [ $37.constructor.name ]);
            })(from);
        };
    };
};
var intFromTo = intStepFromTo(1);
var fromEnum = function (dict) {
    return dict.fromEnum;
};
var tupleFromEnum = function (dictEnum) {
    return function (dictEnum1) {
        return function (cardb) {
            return function (v) {
                return (fromEnum(dictEnum)(v.value0) * runCardinality(cardb) | 0) + fromEnum(dictEnum1)(v.value1) | 0;
            };
        };
    };
};
var enumFromTo = function (dictEnum) {
    return function (a) {
        return function (b) {
            var b__ALT = fromEnum(dictEnum)(b);
            var a__ALT = fromEnum(dictEnum)(a);
            return Prelude["<$>"](Prelude.functorArray)(Prelude[">>>"](Prelude.semigroupoidFn)(toEnum(dictEnum))(Data_Maybe_Unsafe.fromJust))(intFromTo(a__ALT)(b__ALT));
        };
    };
};
var enumFromThenTo = function (dictEnum) {
    return function (a) {
        return function (b) {
            return function (c) {
                var c__ALT = fromEnum(dictEnum)(c);
                var b__ALT = fromEnum(dictEnum)(b);
                var a__ALT = fromEnum(dictEnum)(a);
                return Prelude["<$>"](Prelude.functorArray)(Prelude[">>>"](Prelude.semigroupoidFn)(toEnum(dictEnum))(Data_Maybe_Unsafe.fromJust))(intStepFromTo(b__ALT - a__ALT)(a__ALT)(c__ALT));
            };
        };
    };
};
var eitherFromEnum = function (dictEnum) {
    return function (dictEnum1) {
        return function (carda) {
            return function (v) {
                if (v instanceof Data_Either.Left) {
                    return fromEnum(dictEnum)(v.value0);
                };
                if (v instanceof Data_Either.Right) {
                    return fromEnum(dictEnum1)(v.value0) + runCardinality(carda) | 0;
                };
                throw new Error("Failed pattern match at Data.Enum line 197, column 1 - line 198, column 1: " + [ carda.constructor.name, v.constructor.name ]);
            };
        };
    };
};
var eitherCardinality = function (dictEnum) {
    return function (dictEnum1) {
        return function (l) {
            return function (r) {
                return Cardinality(runCardinality(l) + runCardinality(r) | 0);
            };
        };
    };
};
var eitherToEnum = function (dictEnum) {
    return function (dictEnum1) {
        return function (carda) {
            return function (cardb) {
                return function (n) {
                    var $46 = n >= 0 && n < runCardinality(carda);
                    if ($46) {
                        return Prelude["<$>"](Data_Maybe.functorMaybe)(Data_Either.Left.create)(toEnum(dictEnum)(n));
                    };
                    if (!$46) {
                        var $47 = n >= runCardinality(carda) && n < runCardinality(eitherCardinality(dictEnum)(dictEnum1)(carda)(cardb));
                        if ($47) {
                            return Prelude["<$>"](Data_Maybe.functorMaybe)(Data_Either.Right.create)(toEnum(dictEnum1)(n - runCardinality(carda)));
                        };
                        if (!$47) {
                            return Data_Maybe.Nothing.value;
                        };
                        throw new Error("Failed pattern match: " + [ $47.constructor.name ]);
                    };
                    throw new Error("Failed pattern match at Data.Enum line 189, column 1 - line 190, column 1: " + [ $46.constructor.name ]);
                };
            };
        };
    };
};
var defaultToEnum = function (succ__ALT) {
    return function (bottom__ALT) {
        return function (n) {
            if (n < 0) {
                return Data_Maybe.Nothing.value;
            };
            if (n === 0) {
                return new Data_Maybe.Just(bottom__ALT);
            };
            if (Prelude.otherwise) {
                return Prelude[">>="](Data_Maybe.bindMaybe)(defaultToEnum(succ__ALT)(bottom__ALT)(n - 1))(succ__ALT);
            };
            throw new Error("Failed pattern match: " + [ succ__ALT.constructor.name, bottom__ALT.constructor.name, n.constructor.name ]);
        };
    };
};
var defaultSucc = function (toEnum__ALT) {
    return function (fromEnum__ALT) {
        return function (a) {
            return toEnum__ALT(fromEnum__ALT(a) + 1 | 0);
        };
    };
};
var defaultPred = function (toEnum__ALT) {
    return function (fromEnum__ALT) {
        return function (a) {
            return toEnum__ALT(fromEnum__ALT(a) - 1);
        };
    };
};
var defaultFromEnum = function (pred__ALT) {
    return function (e) {
        return Data_Maybe.maybe(0)(function (prd) {
            return defaultFromEnum(pred__ALT)(prd) + 1 | 0;
        })(pred__ALT(e));
    };
};
var charToEnum = function (n) {
    if (n >= 0 && n <= 65535) {
        return Data_Maybe.Just.create(Data_Char.fromCharCode(n));
    };
    return Data_Maybe.Nothing.value;
};
var charFromEnum = Data_Char.toCharCode;
var enumChar = new Enum(function () {
    return Prelude.boundedChar;
}, 65536, charFromEnum, defaultPred(charToEnum)(charFromEnum), defaultSucc(charToEnum)(charFromEnum), charToEnum);
var cardinality = function (dict) {
    return dict.cardinality;
};
var enumEither = function (dictEnum) {
    return function (dictEnum1) {
        return new Enum(function () {
            return Data_Either.boundedEither(dictEnum["__superclass_Prelude.Bounded_0"]())(dictEnum1["__superclass_Prelude.Bounded_0"]());
        }, eitherCardinality(dictEnum)(dictEnum1)(cardinality(dictEnum))(cardinality(dictEnum1)), eitherFromEnum(dictEnum)(dictEnum1)(cardinality(dictEnum)), function (v) {
            if (v instanceof Data_Either.Left) {
                return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($72) {
                    return Data_Maybe.Just.create(Data_Either.Left.create($72));
                })(pred(dictEnum)(v.value0));
            };
            if (v instanceof Data_Either.Right) {
                return Data_Maybe.maybe(Data_Maybe.Just.create(new Data_Either.Left(Prelude.top(dictEnum["__superclass_Prelude.Bounded_0"]()))))(function ($73) {
                    return Data_Maybe.Just.create(Data_Either.Right.create($73));
                })(pred(dictEnum1)(v.value0));
            };
            throw new Error("Failed pattern match at Data.Enum line 180, column 1 - line 189, column 1: " + [ v.constructor.name ]);
        }, function (v) {
            if (v instanceof Data_Either.Left) {
                return Data_Maybe.maybe(Data_Maybe.Just.create(new Data_Either.Right(Prelude.bottom(dictEnum1["__superclass_Prelude.Bounded_0"]()))))(function ($74) {
                    return Data_Maybe.Just.create(Data_Either.Left.create($74));
                })(succ(dictEnum)(v.value0));
            };
            if (v instanceof Data_Either.Right) {
                return Data_Maybe.maybe(Data_Maybe.Nothing.value)(function ($75) {
                    return Data_Maybe.Just.create(Data_Either.Right.create($75));
                })(succ(dictEnum1)(v.value0));
            };
            throw new Error("Failed pattern match at Data.Enum line 180, column 1 - line 189, column 1: " + [ v.constructor.name ]);
        }, eitherToEnum(dictEnum)(dictEnum1)(cardinality(dictEnum))(cardinality(dictEnum1)));
    };
};
var enumMaybe = function (dictEnum) {
    return new Enum(function () {
        return Data_Maybe.boundedMaybe(dictEnum["__superclass_Prelude.Bounded_0"]());
    }, maybeCardinality(dictEnum)(cardinality(dictEnum)), function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return 0;
        };
        if (v instanceof Data_Maybe.Just) {
            return fromEnum(dictEnum)(v.value0) + 1 | 0;
        };
        throw new Error("Failed pattern match at Data.Enum line 128, column 1 - line 138, column 1: " + [ v.constructor.name ]);
    }, function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return Data_Maybe.Nothing.value;
        };
        if (v instanceof Data_Maybe.Just) {
            return Prelude["<$>"](Data_Maybe.functorMaybe)(Data_Maybe.Just.create)(pred(dictEnum)(v.value0));
        };
        throw new Error("Failed pattern match at Data.Enum line 128, column 1 - line 138, column 1: " + [ v.constructor.name ]);
    }, function (v) {
        if (v instanceof Data_Maybe.Nothing) {
            return Data_Maybe.Just.create(Prelude.bottom(Data_Maybe.boundedMaybe(dictEnum["__superclass_Prelude.Bounded_0"]())));
        };
        if (v instanceof Data_Maybe.Just) {
            return Prelude["<$>"](Data_Maybe.functorMaybe)(Data_Maybe.Just.create)(succ(dictEnum)(v.value0));
        };
        throw new Error("Failed pattern match at Data.Enum line 128, column 1 - line 138, column 1: " + [ v.constructor.name ]);
    }, maybeToEnum(dictEnum)(cardinality(dictEnum)));
};
var enumTuple = function (dictEnum) {
    return function (dictEnum1) {
        return new Enum(function () {
            return Data_Tuple.boundedTuple(dictEnum["__superclass_Prelude.Bounded_0"]())(dictEnum1["__superclass_Prelude.Bounded_0"]());
        }, tupleCardinality(dictEnum)(dictEnum1)(cardinality(dictEnum))(cardinality(dictEnum1)), tupleFromEnum(dictEnum)(dictEnum1)(cardinality(dictEnum1)), function (v) {
            return Data_Maybe.maybe(Prelude["<$>"](Data_Maybe.functorMaybe)(Prelude.flip(Data_Tuple.Tuple.create)(Prelude.bottom(dictEnum1["__superclass_Prelude.Bounded_0"]())))(pred(dictEnum)(v.value0)))(function ($76) {
                return Data_Maybe.Just.create(Data_Tuple.Tuple.create(v.value0)($76));
            })(pred(dictEnum1)(v.value1));
        }, function (v) {
            return Data_Maybe.maybe(Prelude["<$>"](Data_Maybe.functorMaybe)(Prelude.flip(Data_Tuple.Tuple.create)(Prelude.bottom(dictEnum1["__superclass_Prelude.Bounded_0"]())))(succ(dictEnum)(v.value0)))(function ($77) {
                return Data_Maybe.Just.create(Data_Tuple.Tuple.create(v.value0)($77));
            })(succ(dictEnum1)(v.value1));
        }, tupleToEnum(dictEnum)(dictEnum1)(cardinality(dictEnum1)));
    };
};
var booleanSucc = function (v) {
    if (!v) {
        return new Data_Maybe.Just(true);
    };
    return Data_Maybe.Nothing.value;
};
var booleanPred = function (v) {
    if (v) {
        return new Data_Maybe.Just(false);
    };
    return Data_Maybe.Nothing.value;
};
var enumBoolean = new Enum(function () {
    return Prelude.boundedBoolean;
}, 2, defaultFromEnum(booleanPred), booleanPred, booleanSucc, defaultToEnum(booleanSucc)(false));
module.exports = {
    Cardinality: Cardinality,
    Enum: Enum,
    enumFromThenTo: enumFromThenTo,
    enumFromTo: enumFromTo,
    intStepFromTo: intStepFromTo,
    intFromTo: intFromTo,
    defaultFromEnum: defaultFromEnum,
    defaultToEnum: defaultToEnum,
    defaultPred: defaultPred,
    defaultSucc: defaultSucc,
    toEnum: toEnum,
    succ: succ,
    runCardinality: runCardinality,
    pred: pred,
    fromEnum: fromEnum,
    cardinality: cardinality,
    enumChar: enumChar,
    enumMaybe: enumMaybe,
    enumBoolean: enumBoolean,
    enumTuple: enumTuple,
    enumEither: enumEither
};