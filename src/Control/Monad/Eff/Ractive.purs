module Control.Monad.Eff.Ractive where

import Prelude              (Unit, bind)
import Control.Monad.Eff    (Eff)
import Data.Maybe           (Maybe)
import Data.Foreign.EasyFFI (unsafeForeignFunction, unsafeForeignProcedure)

type Data a b = {
  template :: String,
  el :: String,
  partials :: { | a},
  "data" :: { | b}
}

type Event = {
  node :: DOMNode,
  original :: DOMEvent,
  keypath :: String,
  context :: {
    name :: String
  }
}

type RactiveEventCallback = forall a e. Ractive -> Event -> Eff e a

data RenderQuery = RQString String | RQNode DOMNode

foreign import data DOMEvent :: *

foreign import data DOMNode :: *

foreign import data RactiveM :: !

foreign import data Ractive :: *

foreign import data Text :: *

foreign import data Element :: *

foreign import data Cancellable :: *

type RactiveEff a = forall e. Eff (ractiveM :: RactiveM | e) a

ffiF :: forall a. Array String -> String -> a
ffiF = unsafeForeignFunction

ffiP :: forall a. Array String -> String -> a
ffiP = unsafeForeignProcedure

-- alternative way // comment out the below foreign import when using this one
{-ractive :: forall a. String -> String -> a -> RactiveEff Ractive
ractive = ffiF ["template", "document", "data", ""] "new Ractive({template:template, el: document, data:data})"
-}

foreign import ractive :: forall a b. Data a b -> RactiveEff Ractive

ractiveFromData :: forall a b. Data a b -> RactiveEff Ractive
ractiveFromData = ffiF ["data", ""] "new Ractive(data);"

foreign import get :: forall a. String -> Ractive -> RactiveEff a
foreign import set :: forall a. String -> a -> Ractive -> RactiveEff Unit

setPartial :: String -> String -> Ractive -> RactiveEff Unit
setPartial = ffiP ["selector", "value", "ractive"] "ractive.partials[selector] = value;"

getPartial :: String -> Ractive -> RactiveEff String
getPartial = ffiF ["selector","ractive"] "ractive.partials[selector];"

foreign import on :: forall a e. String -> (Ractive -> Event -> Eff e a) -> Ractive -> RactiveEff Cancellable
foreign import off :: Maybe String -> Maybe RactiveEventCallback -> Ractive -> RactiveEff Ractive

updateModel :: Ractive -> RactiveEff Unit
updateModel = ffiP ["ractive"] "ractive.updateModel();"

renderById :: String -> Ractive -> RactiveEff Unit
renderById = ffiP ["id","ractive"] "ractive.render(id);"
