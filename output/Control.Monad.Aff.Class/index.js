// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Control_Monad_Aff = require("Control.Monad.Aff");
var Control_Monad_Cont_Trans = require("Control.Monad.Cont.Trans");
var Control_Monad_Except_Trans = require("Control.Monad.Except.Trans");
var Control_Monad_List_Trans = require("Control.Monad.List.Trans");
var Control_Monad_Maybe_Trans = require("Control.Monad.Maybe.Trans");
var Control_Monad_Reader_Trans = require("Control.Monad.Reader.Trans");
var Control_Monad_RWS_Trans = require("Control.Monad.RWS.Trans");
var Control_Monad_State_Trans = require("Control.Monad.State.Trans");
var Control_Monad_Trans = require("Control.Monad.Trans");
var Control_Monad_Writer_Trans = require("Control.Monad.Writer.Trans");
var Data_Monoid = require("Data.Monoid");
var MonadAff = function (liftAff) {
    this.liftAff = liftAff;
};
var monadAffAff = new MonadAff(Prelude.id(Prelude.categoryFn));
var liftAff = function (dict) {
    return dict.liftAff;
};
var monadAffContT = function (dictMonad) {
    return function (dictMonadAff) {
        return new MonadAff(function ($18) {
            return Control_Monad_Trans.lift(Control_Monad_Cont_Trans.monadTransContT)(dictMonad)(liftAff(dictMonadAff)($18));
        });
    };
};
var monadAffExceptT = function (dictMonad) {
    return function (dictMonadAff) {
        return new MonadAff(function ($19) {
            return Control_Monad_Trans.lift(Control_Monad_Except_Trans.monadTransExceptT)(dictMonad)(liftAff(dictMonadAff)($19));
        });
    };
};
var monadAffListT = function (dictMonad) {
    return function (dictMonadAff) {
        return new MonadAff(function ($20) {
            return Control_Monad_Trans.lift(Control_Monad_List_Trans.monadTransListT)(dictMonad)(liftAff(dictMonadAff)($20));
        });
    };
};
var monadAffMaybe = function (dictMonad) {
    return function (dictMonadAff) {
        return new MonadAff(function ($21) {
            return Control_Monad_Trans.lift(Control_Monad_Maybe_Trans.monadTransMaybeT)(dictMonad)(liftAff(dictMonadAff)($21));
        });
    };
};
var monadAffRWS = function (dictMonad) {
    return function (dictMonoid) {
        return function (dictMonadAff) {
            return new MonadAff(function ($22) {
                return Control_Monad_Trans.lift(Control_Monad_RWS_Trans.monadTransRWST(dictMonoid))(dictMonad)(liftAff(dictMonadAff)($22));
            });
        };
    };
};
var monadAffReader = function (dictMonad) {
    return function (dictMonadAff) {
        return new MonadAff(function ($23) {
            return Control_Monad_Trans.lift(Control_Monad_Reader_Trans.monadTransReaderT)(dictMonad)(liftAff(dictMonadAff)($23));
        });
    };
};
var monadAffState = function (dictMonad) {
    return function (dictMonadAff) {
        return new MonadAff(function ($24) {
            return Control_Monad_Trans.lift(Control_Monad_State_Trans.monadTransStateT)(dictMonad)(liftAff(dictMonadAff)($24));
        });
    };
};
var monadAffWriter = function (dictMonad) {
    return function (dictMonoid) {
        return function (dictMonadAff) {
            return new MonadAff(function ($25) {
                return Control_Monad_Trans.lift(Control_Monad_Writer_Trans.monadTransWriterT(dictMonoid))(dictMonad)(liftAff(dictMonadAff)($25));
            });
        };
    };
};
module.exports = {
    MonadAff: MonadAff, 
    liftAff: liftAff, 
    monadAffAff: monadAffAff, 
    monadAffContT: monadAffContT, 
    monadAffExceptT: monadAffExceptT, 
    monadAffListT: monadAffListT, 
    monadAffMaybe: monadAffMaybe, 
    monadAffReader: monadAffReader, 
    monadAffRWS: monadAffRWS, 
    monadAffState: monadAffState, 
    monadAffWriter: monadAffWriter
};