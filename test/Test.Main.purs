module Test.Main where

<<<<<<< HEAD
import Prelude (Unit, bind, (==), (<>))
import Data.Maybe (Maybe(..))
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Exception (EXCEPTION)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Ractive (RactiveM, Data(..), set, observe, get, subtract, ractive, add)
import Control.Monad.Eff.Random (RANDOM)
import Debug.Trace (traceA)
import Test.QuickCheck (quickCheck)
=======
import Prelude                     (bind, Unit, (++), (==))
import Data.Maybe                  (Maybe(..))
import Control.Monad.Eff           (Eff)
import Control.Monad.Eff.Exception (EXCEPTION)
import Control.Monad.Eff.Console   (CONSOLE, log)
import Control.Monad.Eff.Ractive   (RactiveM, Data(..), RactiveEff, ractive,
                                    set, observe, get, subtract)
import Control.Monad.Eff.Random    (RANDOM)
import Debug.Trace                 (traceA)
import Test.QuickCheck             (quickCheck)
>>>>>>> 71271eea7ac92ddfe211a64f98ec8c0bfb601ac1

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

<<<<<<< HEAD
       (add "counter" (Just 5.0) Nothing ract)
=======
       cntr0 <- get "counter" ract
       (Control.Monad.Eff.Ractive.add "counter" (Just 5.0) Nothing ract)
>>>>>>> 71271eea7ac92ddfe211a64f98ec8c0bfb601ac1
       cntr1 <- (get "counter" ract)
       (subtract "counter" (Just 1.0) Nothing ract)
       cntr2 <- (get "counter" ract)
       -- | test add() / subtract()
       quickCheck (cntr0 == (Just 0))
       quickCheck (cntr1 == (Just 5.0))
       quickCheck (cntr2 == (Just 4.0))

       traceA "[TESTING] get()"
       set "message" "HELLO WORLD!" ract
       m <- (get "message" ract)
       -- | test get()
       quickCheck (m == (Just "HELLO WORLD!"))
       missing <- get "missing" ract :: RactiveEff (Maybe String)
       quickCheck (missing == Nothing)

       traceA "[TESTING] observe()"
       (observe "message" (\n o kp -> log ("observe(): " <> n)) Nothing ract)
       set "message" "observe() should catch me!" ract
