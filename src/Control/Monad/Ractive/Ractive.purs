module Control.Monad.Eff.Ractive where

import Prelude              (Unit, bind)
import Control.Monad.Eff    (Eff)
import Data.Foreign.EasyFFI (unsafeForeignFunction, unsafeForeignProcedure)

-- TODO: How to restrict values a of type String?
type Data a b = {
  template :: String,
  el :: String,
  partials :: { | a},
  "data" :: { | b}}

type Event = {node :: DOMNode,
  original :: DOMEvent,
  keypath :: String,
  context :: {name :: String}}

data RenderQuery = RQString String | RQNode DOMNode

foreign import data DOMEvent :: *

foreign import data DOMNode :: *

foreign import data RactiveM :: !

foreign import data Ractive :: *

type RactiveEff a = forall e. Eff (ractiveM :: RactiveM | e) a

ffiF :: forall t3. Array String -> String -> t3
ffiF = unsafeForeignFunction

ffiP :: forall a. Array String -> String -> a
ffiP = unsafeForeignProcedure

ractive :: forall a. String -> String -> a -> RactiveEff Ractive
ractive = ffiF ["template", "document", "data", ""] "new Ractive({template:template, el: document, data:data});"

ractiveFromData :: forall a b. Data a b -> RactiveEff Ractive
ractiveFromData = ffiF ["data", ""] "new Ractive(data);"

get :: forall a. String -> Ractive -> RactiveEff a
get = ffiF ["field", "ractive", ""] "ractive.get(field)"

set :: forall a. String -> a -> Ractive -> RactiveEff Unit
set = unsafeForeignFunction ["selector","ractive"] "ractive.set(selector)"

setPartial :: String -> String -> Ractive -> RactiveEff Unit
setPartial = unsafeForeignProcedure ["selector", "value", "ractive"] "ractive.partials[selector] = value;"

getPartial :: String -> Ractive -> RactiveEff String
getPartial = unsafeForeignFunction ["selector","ractive"] "ractive.partials[selector];"

on :: forall a e. String -> (Ractive -> Event -> Eff e a) -> Ractive -> RactiveEff Ractive
on = unsafeForeignFunction ["event","handler","ractive"] "ractive.on(event,handler);"

off :: forall a e. String -> String -> Ractive -> RactiveEff Ractive
off = unsafeForeignFunction ["event","handler","ractive"] "ractive.off(event,handler);"

updateModel :: Ractive -> RactiveEff Unit
updateModel = unsafeForeignProcedure ["ractive"] "ractive.updateModel();"

renderById :: String -> Ractive -> RactiveEff Unit
renderById = unsafeForeignFunction ["id","ractive"] "ractive.render(id);"
