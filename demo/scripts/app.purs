module DemoApp.WithRactive where

import Control.Monad.Eff
import Control.Monad.Eff.Ractive (RactiveM, Ractive, ractive)


main :: Eff (ractiveM :: RactiveM) Ractive
main = ractive "#template" "#app" {
                                    uiLibrary : "RactiveJS",
                                    language  : "PureScript",
                                    logoUrl   : "http://www.brakmic.de/img/ps-logo.png",
                                    message   : "Hello, world!"
                                  }