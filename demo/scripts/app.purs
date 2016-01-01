module DemoApp.WithRactive where

import Prelude (..)
import Control.Monad.Eff
import Control.Monad.Eff.Ractive (RactiveM, Ractive, RactiveEff, ractive, get, set, setPartial, on, off)

-- change a property by using Ractive's set method: http://docs.ractivejs.org/latest/ractive-set
change :: forall value. String -> value -> Ractive -> (forall e. Eff (ractiveM :: RactiveM | e) Unit)
change property value ractive = do
                      set property value ractive

newtype RactiveInstance = RactiveInstance Ractive

main :: forall eff. Eff (ractiveM :: RactiveM | eff) Unit
main = do
       ract <- ractive { template : "#template",
                      el : "#app",
                      partials : {},
                      "data" : {
                                    uiLibrary : "RactiveJS",
                                    language  : "PureScript",
                                    logoUrl   : "http://www.brakmic.de/img/ps-logo.png",
                                    message   : "Hello, world!"
                                  }
                      }
     -- alternative call (lines 38/39 in Control/Monad/Eff/Ractive.purs must be uncommented)
     {-  ract <- ractive "#template" "#app" {
                                    uiLibrary : "RactiveJS",
                                    language  : "PureScript",
                                    logoUrl   : "http://www.brakmic.de/img/ps-logo.png",
                                    message   : "Hello, world!"
                                  }-}

       change "message" "HELLO WORLD!" ract
