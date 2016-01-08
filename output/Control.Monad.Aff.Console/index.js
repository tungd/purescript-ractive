// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Eff_Console = require("Control.Monad.Eff.Console");
var Control_Monad_Aff = require("Control.Monad.Aff");
var Control_Monad_Eff_Class = require("Control.Monad.Eff.Class");
var print = function (dictShow) {
    return function (a) {
        return Prelude.bind(Control_Monad_Aff.bindAff)(Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)(Control_Monad_Eff_Console.print(dictShow)(a)))(function () {
            return Prelude["return"](Control_Monad_Aff.applicativeAff)(a);
        });
    };
};
var log = function (s) {
    return Prelude.bind(Control_Monad_Aff.bindAff)(Control_Monad_Eff_Class.liftEff(Control_Monad_Aff.monadEffAff)(Control_Monad_Eff_Console.log(s)))(function () {
        return Prelude["return"](Control_Monad_Aff.applicativeAff)(s);
    });
};
module.exports = {
    print: print, 
    log: log
};
