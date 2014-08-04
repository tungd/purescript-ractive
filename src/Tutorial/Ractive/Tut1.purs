module Tutorial.Ractive.Demo.Tutorials where

import Debug.Trace
import Control.Monad.Cont.Trans
import Control.Monad.Eff
import Control.Monad.Eff.Ractive

data Tutorial a eff = Tutorial String (Ractive -> ContT Unit (Eff eff) a)

type TutorialFn = forall e. TutorialPartials -> ContT Unit (Eff (trace :: Trace, ractive :: RactiveM | e)) Unit

ractiveTemplate = "#ractive-template"
ractiveElement = "ractive-element"

tutorials = [{"name": "tut1"},{"name": "tut2"}]

createRactive partials d = ractiveFromData {template: ractiveTemplate,
  el: ractiveElement,
  partials: partials,
  "data": d}

tutorial1 :: forall e. Tutorial Unit (trace :: Trace, ractiveM :: RactiveM | e)
tutorial1 = Tutorial "tut1" tutorial1Fn

tutorial1Fn :: forall e. Ractive -> ContT Unit (Eff (trace :: Trace, ractiveM :: RactiveM | e)) Unit
tutorial1Fn ractive = ContT \_ -> do
  trace "Tutorial 1 starting"
  trace "Tutorial 1 Done"

-- Tutorial 2
tutorial2Fn :: TutorialFn
tutorial2Fn partials = ContT \_ -> do
  r <- ractiveFromData {}"template" "el" {partials: partials}
