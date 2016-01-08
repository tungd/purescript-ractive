// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Function = require("Data.Function");
var Data_Monoid = require("Data.Monoid");
var Min = function (x) {
    return x;
};
var Max = function (x) {
    return x;
};
var Down = function (x) {
    return x;
};
var showMin = function (dictShow) {
    return new Prelude.Show(function (v) {
        return "(Min " + (Prelude.show(dictShow)(v) + ")");
    });
};
var showMax = function (dictShow) {
    return new Prelude.Show(function (v) {
        return "(Max " + (Prelude.show(dictShow)(v) + ")");
    });
};
var showDown = function (dictShow) {
    return new Prelude.Show(function (v) {
        return "(Down " + (Prelude.show(dictShow)(v) + ")");
    });
};
var runMin = function (v) {
    return v;
};
var runMax = function (v) {
    return v;
};
var min = function (dictOrd) {
    return function (x) {
        return function (y) {
            var $39 = Prelude.compare(dictOrd)(x)(y);
            if ($39 instanceof Prelude.LT) {
                return x;
            };
            if ($39 instanceof Prelude.EQ) {
                return x;
            };
            if ($39 instanceof Prelude.GT) {
                return y;
            };
            throw new Error("Failed pattern match at Data.Ord line 58, column 1 - line 59, column 1: " + [ $39.constructor.name ]);
        };
    };
};
var semigroupMin = function (dictOrd) {
    return new Prelude.Semigroup(function (v) {
        return function (v1) {
            return min(dictOrd)(v)(v1);
        };
    });
};
var monoidMin = function (dictOrd) {
    return function (dictBounded) {
        return new Data_Monoid.Monoid(function () {
            return semigroupMin(dictOrd);
        }, Prelude.top(dictBounded));
    };
};
var max = function (dictOrd) {
    return function (x) {
        return function (y) {
            var $42 = Prelude.compare(dictOrd)(x)(y);
            if ($42 instanceof Prelude.LT) {
                return y;
            };
            if ($42 instanceof Prelude.EQ) {
                return x;
            };
            if ($42 instanceof Prelude.GT) {
                return x;
            };
            throw new Error("Failed pattern match at Data.Ord line 67, column 1 - line 68, column 1: " + [ $42.constructor.name ]);
        };
    };
};
var semigroupMax = function (dictOrd) {
    return new Prelude.Semigroup(function (v) {
        return function (v1) {
            return max(dictOrd)(v)(v1);
        };
    });
};
var monoidMax = function (dictOrd) {
    return function (dictBounded) {
        return new Data_Monoid.Monoid(function () {
            return semigroupMax(dictOrd);
        }, Prelude.bottom(dictBounded));
    };
};
var invert = function (v) {
    if (v instanceof Prelude.GT) {
        return Prelude.LT.value;
    };
    if (v instanceof Prelude.EQ) {
        return Prelude.EQ.value;
    };
    if (v instanceof Prelude.LT) {
        return Prelude.GT.value;
    };
    throw new Error("Failed pattern match at Data.Ord line 11, column 1 - line 12, column 1: " + [ v.constructor.name ]);
};
var eqMin = function (dictEq) {
    return new Prelude.Eq(Data_Function.on(Prelude.eq(dictEq))(runMin));
};
var ordMin = function (dictOrd) {
    return new Prelude.Ord(function () {
        return eqMin(dictOrd["__superclass_Prelude.Eq_0"]());
    }, Data_Function.on(Prelude.compare(dictOrd))(runMin));
};
var eqMax = function (dictEq) {
    return new Prelude.Eq(Data_Function.on(Prelude.eq(dictEq))(runMax));
};
var ordMax = function (dictOrd) {
    return new Prelude.Ord(function () {
        return eqMax(dictOrd["__superclass_Prelude.Eq_0"]());
    }, Data_Function.on(Prelude.compare(dictOrd))(runMax));
};
var eqDown = function (dictEq) {
    return new Prelude.Eq(function (v) {
        return function (v1) {
            return Prelude["=="](dictEq)(v)(v1);
        };
    });
};
var ordDown = function (dictOrd) {
    return new Prelude.Ord(function () {
        return eqDown(dictOrd["__superclass_Prelude.Eq_0"]());
    }, function (v) {
        return function (v1) {
            return invert(Prelude.compare(dictOrd)(v)(v1));
        };
    });
};
var comparing = function (dictOrd) {
    return function (f) {
        return Data_Function.on(Prelude.compare(dictOrd))(f);
    };
};
var clamp = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                return min(dictOrd)(hi)(max(dictOrd)(low)(x));
            };
        };
    };
};
var between = function (dictOrd) {
    return function (low) {
        return function (hi) {
            return function (x) {
                return Prelude["<="](dictOrd)(low)(x) && Prelude["<="](dictOrd)(x)(hi);
            };
        };
    };
};
module.exports = {
    Max: Max, 
    Min: Min, 
    Down: Down, 
    runMax: runMax, 
    runMin: runMin, 
    max: max, 
    min: min, 
    between: between, 
    clamp: clamp, 
    comparing: comparing, 
    invert: invert, 
    eqDown: eqDown, 
    showDown: showDown, 
    ordDown: ordDown, 
    eqMin: eqMin, 
    showMin: showMin, 
    ordMin: ordMin, 
    semigroupMin: semigroupMin, 
    monoidMin: monoidMin, 
    eqMax: eqMax, 
    showMax: showMax, 
    ordMax: ordMax, 
    semigroupMax: semigroupMax, 
    monoidMax: monoidMax
};
