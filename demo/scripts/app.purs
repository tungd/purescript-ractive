module DemoApp.WithRactive where

import Prelude                   (Unit, bind, not)
import Control.Monad.Eff         (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Ractive (RactiveM, Ractive, get, on, ractive, set)
import Control.Monad.Eff.Random  (RANDOM, random)

-- | Change a property by using Ractive's set() method
-- | The `RactiveM` type constructor is used to represent _RactiveJS_ effects.
-- |
-- | See [set-property from RactiveJS docs](http://docs.ractivejs.org/latest/ractive-set) for more details.
change :: forall value. String -> value -> Ractive -> (forall e. Eff (ractiveM :: RactiveM | e) Unit)
change property value ractive = do
                                  set property value ractive
-- | Inverse a Boolean value
inverse :: Boolean -> Boolean
inverse canRand = not canRand

-- | Change the random numeric value in Ractive's property "message"
-- | The `RactiveM` type constructor is used to represent _RactiveJS_ effects.
-- | The `RANDOM` type constructor is used to represent _RANDOM_ values generator effects.
setRandom :: forall e. Ractive -> Eff (random :: RANDOM, ractiveM :: RactiveM | e) Unit
setRandom ractive = do
            n <- random
            (change "message" n ractive)

main :: forall eff. Eff (ractiveM :: RactiveM, console :: CONSOLE, random :: RANDOM | eff) Unit
main = do
       ract <- ractive { template : "#template",
                      el : "#app",
                      partials : {},
                      "data" : {
                                    uiLibrary : "RactiveJS",
                                    language  : "PureScript",
                                    logoUrl   : "./content/img/ps-logo.png",
                                    message   : "Click the PureScript Logo!",
                                    canRandomize : true
                                  }
                      }
       -- alternative call (lines 46/49 in Control/Monad/Eff/Ractive.purs must be uncommented)
       {-  ract <- ractive "#template" "#app" {
                                    uiLibrary : "RactiveJS",
                                    language  : "PureScript",
                                    logoUrl   : "./content/img/ps-logo.png",
                                    message   : "Hello, world!"
                                 }-}
       -- register an event-handler
       -- generate a random number each time we click the logo
       on "logo-clicked" (\r e -> do
                                    can <- get "canRandomize" r
                                    if can then (setRandom r) else (change "message" "Randomization disabled!" r)
                        ) ract
       on "control-button-clicked" (\r e -> do
                                          can <- (get "canRandomize" r)
                                          change "canRandomize" (inverse can) r) ract
       -- deregister the event handler
       -- see also: http://docs.ractivejs.org/latest/ractive-off
       --> off (Just "logo-clicked") Nothing ract

       -- change the internal state of Ractive instance
       -- here we manipulate its property `message`
       --> change "message" "HELLO WORLD!" ract

       -- return a value from Ractive
       -- see also: http://docs.ractivejs.org/latest/ractive-get
       m <- (get "message" ract)
       log m
