// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Control_Alt = require("Control.Alt");
var Control_Plus = require("Control.Plus");
var Control_Alternative = require("Control.Alternative");
var Valid = (function () {
    function Valid(value0) {
        this.value0 = value0;
    };
    Valid.create = function (value0) {
        return new Valid(value0);
    };
    return Valid;
})();
var Invalid = (function () {
    function Invalid(value0) {
        this.value0 = value0;
    };
    Invalid.create = function (value0) {
        return new Invalid(value0);
    };
    return Invalid;
})();
var showV = function (dictShow) {
    return function (dictShow1) {
        return new Prelude.Show(function (v) {
            if (v instanceof Invalid) {
                return "Invalid (" + (Prelude.show(dictShow)(v.value0) + ")");
            };
            if (v instanceof Valid) {
                return "Valid (" + (Prelude.show(dictShow1)(v.value0) + ")");
            };
            throw new Error("Failed pattern match at Data.Validation.Semiring line 53, column 1 - line 57, column 1: " + [ v.constructor.name ]);
        });
    };
};
var runV = function (f) {
    return function (g) {
        return function (v) {
            if (v instanceof Invalid) {
                return f(v.value0);
            };
            if (v instanceof Valid) {
                return g(v.value0);
            };
            throw new Error("Failed pattern match at Data.Validation.Semiring line 44, column 1 - line 45, column 1: " + [ f.constructor.name, g.constructor.name, v.constructor.name ]);
        };
    };
};
var isValid = function (v) {
    if (v instanceof Valid) {
        return true;
    };
    return false;
};
var invalid = Invalid.create;
var functorV = new Prelude.Functor(function (f) {
    return function (v) {
        if (v instanceof Invalid) {
            return new Invalid(v.value0);
        };
        if (v instanceof Valid) {
            return new Valid(f(v.value0));
        };
        throw new Error("Failed pattern match at Data.Validation.Semiring line 57, column 1 - line 61, column 1: " + [ f.constructor.name, v.constructor.name ]);
    };
});
var applyV = function (dictSemiring) {
    return new Prelude.Apply(function () {
        return functorV;
    }, function (v) {
        return function (v1) {
            if (v instanceof Invalid && v1 instanceof Invalid) {
                return new Invalid(Prelude["*"](dictSemiring)(v.value0)(v1.value0));
            };
            if (v instanceof Invalid) {
                return new Invalid(v.value0);
            };
            if (v1 instanceof Invalid) {
                return new Invalid(v1.value0);
            };
            if (v instanceof Valid && v1 instanceof Valid) {
                return new Valid(v.value0(v1.value0));
            };
            throw new Error("Failed pattern match at Data.Validation.Semiring line 61, column 1 - line 67, column 1: " + [ v.constructor.name, v1.constructor.name ]);
        };
    });
};
var applicativeV = function (dictSemiring) {
    return new Prelude.Applicative(function () {
        return applyV(dictSemiring);
    }, Valid.create);
};
var altV = function (dictSemiring) {
    return new Control_Alt.Alt(function () {
        return functorV;
    }, function (v) {
        return function (v1) {
            if (v instanceof Invalid && v1 instanceof Invalid) {
                return new Invalid(Prelude["+"](dictSemiring)(v.value0)(v1.value0));
            };
            if (v instanceof Invalid) {
                return v1;
            };
            if (v instanceof Valid) {
                return new Valid(v.value0);
            };
            throw new Error("Failed pattern match at Data.Validation.Semiring line 70, column 1 - line 75, column 1: " + [ v.constructor.name, v1.constructor.name ]);
        };
    });
};
var plusV = function (dictSemiring) {
    return new Control_Plus.Plus(function () {
        return altV(dictSemiring);
    }, new Invalid(Prelude.zero(dictSemiring)));
};
var alernativeV = function (dictSemiring) {
    return new Control_Alternative.Alternative(function () {
        return plusV(dictSemiring);
    }, function () {
        return applicativeV(dictSemiring);
    });
};
module.exports = {
    isValid: isValid, 
    runV: runV, 
    invalid: invalid, 
    showV: showV, 
    functorV: functorV, 
    applyV: applyV, 
    applicativeV: applicativeV, 
    altV: altV, 
    plusV: plusV, 
    alernativeV: alernativeV
};