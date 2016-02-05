module Test.Main where

import Prelude (..)
import Data.Maybe (..)
import Control.Monad.Eff (..)
import Control.Monad.Eff.Exception (..)
import Control.Monad.Eff.Console (..)
import Control.Monad.Eff.Ractive (..)
import Control.Monad.Eff.Random (..)
import Test.QuickCheck (..)

foreign import data DOMNode :: *
foreign import data DOMEff  :: !

type DOMEnvEff a = forall e. Eff (domEff :: DOMEff | e) a

foreign import setupDOM :: Maybe String -> DOMEnvEff Unit


main :: forall eff. Eff (domEff :: DOMEff, ractiveM :: RactiveM, console :: CONSOLE, err :: EXCEPTION, random :: RANDOM | eff) Unit
main = do
       setupDOM Nothing
       let appSettings = Data {
                  template : "<div>Testing Template</div>",
                  el : "#app",
                  "data" : {
                          uiLibrary : "RactiveJS",
                  partials : {},
                          language  : "PureScript",
                          logoUrl   : "./content/img/ps-logo.png",
                          message   : "Click the PureScript Logo!",
                          consoleMessages: "no messages",
                          canRandomize : true,
                          numbers: []
                      }
                  }
       ract <- ractive appSettings
       set "message" "HELLO WORLD!" ract
       m <- (get "message" ract)

       quickCheck \n -> n + 1 == 1 + n
       -- quickCheck v
       --quickCheck \n -> n + 1 == 1 + n

       --log "all tests completed"
