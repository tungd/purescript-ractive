module Test.Main where

import Prelude (..)
import Data.Maybe (..)
import Control.Monad.Eff (..)
import Control.Monad.Eff.Exception (..)
import Control.Monad.Eff.Console (..)
import Control.Monad.Eff.Ractive (..)
import Control.Monad.Eff.Random (..)
import Debug.Trace (..)
import Test.QuickCheck (..)

foreign import data DOMNode :: *
foreign import data DOMEff  :: !

type DOMEnvEff a = forall e. Eff (domEff :: DOMEff | e) a

foreign import setupDOM :: Maybe String -> DOMEnvEff Unit


main :: forall eff. Eff (domEff :: DOMEff
                      , ractiveM :: RactiveM
                      , console :: CONSOLE
                      , err :: EXCEPTION
                      , random :: RANDOM
                      | eff) Unit
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
                          counter: 0,
                          numbers: []
                      }
                  }
       ract <- ractive appSettings

       traceA "[TESTING] add() and subtract()"

       (Control.Monad.Eff.Ractive.add "counter" (Just 5.0) Nothing ract)
       cntr1 <- (get "counter" ract)
       (subtract "counter" (Just 1.0) Nothing ract)
       cntr2 <- (get "counter" ract)
       -- | test add() / subtract()
       quickCheck (cntr1 == (Just 5.0))
       quickCheck (cntr2 == (Just 4.0))

       traceA "[TESTING] get()"
       set "message" "HELLO WORLD!" ract
       m <- (get "message" ract)
       -- | test get()
       quickCheck (m == (Just "HELLO WORLD!"))

       traceA "[TESTING] observe()"
       (observe "message" (\n o kp -> log ("observe(): " ++ n)) Nothing ract)
       set "message" "observe() should catch me!" ract
