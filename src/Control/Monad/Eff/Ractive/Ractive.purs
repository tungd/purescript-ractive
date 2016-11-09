module Control.Monad.Eff.Ractive
      (
          Data(..)
        , Target(..)
        , Anchor(..)
        , Argument(..)
        , RactivePartial(..)
        , RactiveValue(..)
        , RactiveEventCallback
        , RactiveObserverCallback
        , ObserverEventData
        , ObserverOptions
        , AnimateOptions
        , FindAllOptions
        , FindAllComponentsOptions
        , StepFunction
        , CompleteFunction
        , EasingFunction
        , EasingParam(..)
        , RenderQuery(..)
        , RactiveEff
        , RactiveM
        , Ractive
        , DOMNode
        , DOMEvent
        , Text
        , Element
        , Cancellable
        , Easing
        , Event
        , add
        , animate
        , detach
        , extend
        , find
        , findAll
        , findAllComponents
        , findComponent
        , findContainer
        , findParent
        , fire
        , get
        , insert
        , observe
        , observeOnce
        , off
        , on
        , pop
        , push
        , render
        , reset
        , resetPartial
        , set
        , shift
        , subtract
        , splice
        , teardown
        , toggle
        , toHTML
        , unrender
        , unshift
        , update
        , updateModel
        , logRaw
        , ractive
      )
      where

import Prelude                   (Unit)
import Control.Monad.Eff         (Eff)
import Control.Monad.Eff.Console (CONSOLE)
import Data.Maybe                (Maybe(..))
import Data.List                 (List)
import Data.Foreign.EasyFFI      (unsafeForeignFunction, unsafeForeignProcedure)

data Data a b = Data {
  template :: String,
  "data"   :: { | a}
  |
  b -- optional properties like "components", "partials", "el" etc.
}

type Event = {
  node     :: DOMNode,
  original :: DOMEvent,
  keypath  :: String,
  context  :: {
    name :: String
  }
}

type ObserverEventData a b = {
  newValue :: a,
  oldValue :: b,
  keyPath  :: String
}

type RactiveEventCallback    = forall a e. Ractive -> Event -> Eff e a

type RactiveObserverCallback = forall a b c e. a -> b -> String -> Eff e c

type ObserverOptions = {
  init    :: Boolean,
  defer   :: Boolean,
  context :: Ractive
}

-- findComponents API params

type FindAllOptions = {
  live :: Boolean
}

type FindAllComponentsOptions = {
  live :: Boolean
}

data Target a         = Target a
data Anchor a         = Anchor a
data Argument a       = Argument a
data RactivePartial a = RactivePartial a
data RactiveValue a   = RactiveValue a

-- end of findComponents API params

--  animate API params

type StepFunction = forall t value. t -> value -> RactiveEff Unit

type CompleteFunction = forall t value. t -> value -> RactiveEff Unit

type EasingFunction = forall t value. t -> value -> RactiveEff Unit

data EasingParam = String | AnimateEasingFunction

type AnimateOptions = {
  duration :: Number,
  easing :: Easing,
  step :: StepFunction,
  complete :: CompleteFunction
}

-- end of anima API params

data RenderQuery             = RQString String | RQNode DOMNode

foreign import data DOMEvent    :: *

foreign import data DOMNode     :: *

foreign import data RactiveM    :: !

foreign import data Ractive     :: *

foreign import data Text        :: *

foreign import data Element     :: *

foreign import data Cancellable :: *

foreign import data Easing :: *

type RactiveEff a = forall e. Eff (ractiveM :: RactiveM | e) a

ffiF              :: forall a. Array String -> String -> a
ffiF              = unsafeForeignFunction

ffiP              :: forall a. Array String -> String -> a
ffiP              = unsafeForeignProcedure

-- | Logging helper
foreign import logRaw :: forall a e. a -> Eff (console :: CONSOLE | e) Unit

-- | Create a new RactiveJS instance
foreign import ractive           :: forall a b. Data a b -> RactiveEff Ractive

-- | RactiveJS API

foreign import add               :: forall a e. String -> Maybe Number -> Maybe (Ractive -> Eff e a) -> Ractive -> RactiveEff Unit
foreign import animate           :: forall a. String -> a -> Maybe AnimateOptions -> Ractive -> RactiveEff Unit
foreign import detach            :: Ractive -> RactiveEff (Maybe DOMNode)
foreign import extend            :: forall a b. Data a b -> RactiveEff Ractive
foreign import find              :: String -> Ractive -> RactiveEff (Maybe DOMNode)
foreign import findAll           :: String -> Maybe FindAllOptions -> Ractive -> RactiveEff (Maybe (Array DOMNode))
foreign import findAllComponents :: String -> Maybe FindAllComponentsOptions -> Ractive -> RactiveEff (Maybe (Array Ractive))
foreign import findComponent     :: String -> Ractive -> RactiveEff (Maybe Ractive)
foreign import findContainer     :: String -> Ractive -> RactiveEff (Maybe Ractive)
foreign import findParent        :: String -> Ractive -> RactiveEff (Maybe Ractive)
foreign import fire              :: forall a. String -> Maybe (List (Argument a)) -> Ractive -> RactiveEff Unit
foreign import get               :: forall a. String -> Ractive -> RactiveEff (Maybe a)
foreign import insert            :: forall a b. Ractive -> Target a -> Maybe (Anchor b) -> RactiveEff Unit
foreign import observe           :: forall a b e. String -> (a -> b -> String -> (Eff e Unit)) -> Maybe ObserverOptions -> Ractive -> RactiveEff (Maybe Cancellable)
foreign import observeOnce       :: forall a b e. String -> (a -> b -> String -> (Eff e Unit)) -> Maybe ObserverOptions -> Ractive -> RactiveEff (Maybe Cancellable)
foreign import off               :: Maybe String -> Maybe RactiveEventCallback -> Ractive -> RactiveEff (Maybe Ractive)
foreign import on                :: forall a e. String -> (Event -> Eff e a) -> Ractive -> RactiveEff (Maybe Cancellable)
foreign import pop               :: forall a e. String -> Maybe (a -> (Eff e Unit)) -> Ractive -> RactiveEff Unit
foreign import push              :: forall a b e. String -> a -> Maybe (b -> (Eff e Unit)) -> Ractive -> RactiveEff Unit
foreign import render            :: forall a. Target a -> Ractive -> RactiveEff Unit
foreign import reset             :: forall a b e. Maybe (Data a b) -> (Ractive -> Eff e Unit) -> Ractive -> RactiveEff Unit
foreign import resetPartial      :: forall a e. String -> RactivePartial a -> Maybe (Ractive ->Eff e Unit) -> Ractive -> RactiveEff Unit
foreign import set               :: forall a. String -> a -> Ractive -> RactiveEff Unit
foreign import shift             :: forall a e. String -> Maybe (Ractive -> Eff e a) -> Ractive -> RactiveEff Unit
foreign import subtract          :: forall a e. String -> Maybe Number -> Maybe (Ractive -> Eff e a) -> Ractive -> RactiveEff Unit
foreign import splice            :: forall a e. String -> Int -> Int -> Maybe (List a) -> (Eff e a) -> Ractive -> RactiveEff Unit
foreign import teardown          :: forall a e. (Eff e a) -> Ractive -> RactiveEff Unit
foreign import toggle            :: forall a e. String -> (Ractive -> Eff e a) -> Ractive -> RactiveEff Unit
foreign import toHTML            :: Ractive -> RactiveEff (Maybe String)
foreign import unrender          :: forall a e. (Ractive -> Eff e a) -> Ractive -> RactiveEff Unit
foreign import unshift           :: forall a b e. String -> a -> (Ractive -> Eff e b) -> Ractive -> RactiveEff Unit
foreign import update            :: forall a e. Maybe String -> (Ractive -> Eff e a) -> Ractive -> RactiveEff Unit
foreign import updateModel       :: forall e. Maybe String -> Maybe Boolean -> (Ractive -> Eff e Unit) -> Ractive -> RactiveEff Unit

-- | End RactiveJS API

ractiveFromData :: forall a b. Data a b -> RactiveEff Ractive
ractiveFromData = ffiF ["data", ""] "new Ractive(data);"

setPartial      :: String -> String -> Ractive -> RactiveEff Unit
setPartial      = ffiP ["selector", "value", "ractive"] "ractive.partials[selector] = value;"

getPartial      :: String -> Ractive -> RactiveEff String
getPartial      = ffiF ["selector","ractive"] "ractive.partials[selector];"
