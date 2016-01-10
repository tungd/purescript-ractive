## Writing Components

The official information regarding RactiveJS components is located <a href="http://docs.ractivejs.org/latest/components" target="_blank">here</a> and <a href="https://github.com/ractivejs/component-spec" target="_blank">here</a>.

In this tutorial we'll describe a development of a simple component containing a logo and a text message.

We will use these two APIs: <a href="https://github.com/brakmic/purescript-ractive/blob/master/src/Control/Monad/Eff/Ractive.purs#L80">ractive</a> and <a href="https://github.com/brakmic/purescript-ractive/blob/master/src/Control/Monad/Eff/Ractive.purs#L81">extend</a>.

## Setup

Every Ractive component extends the basic Ractive `class` via its static method <a href="http://docs.ractivejs.org/latest/ractive-extend" target="_blank">extend</a>. For easier development in a PureScript environment the same API was made available via `foreign import`.

This is how a typical JavaScript Ractive Component definition looks like:

```javascript

var mycomponent = Ractive.extend({
  template: "#some-template-script" //or just a template-string
                                    //containing an HTML-structure definition
  data: {
    "ractive-logo": "some-url-here",
    info: "Hello there!"
  }
})
```

Notice the absence of the `el`-property. This is because a Child-Component doesn't automatically take a DOM-element to mount. Instead, its containing Component (the main Ractive instance, for example) will mount it somewhere within its area. Such a location is defined by an HTML-tag of the same name like the child component itself. The component from above would, for example, mount a new DOM-element called `<mycomponent/>`.

Here are two templates: a main Ractive instance and its child component:

```html
<!-- Template for the main Ractive instance -->
<script id="main-instance-template" type="text/ractive">
    <div>
    <h2>Main Component</h2>
    <div>{{message}}</div>
    <div>
      <h3>Child Component</h3>
        <mycomponent/> <!-- The child component will mount here-->
      </div>
    </div>
    </script>
```

```html
<!-- Template of the Child Component -->
<!-- This piece of HTML-structure will replace the <mycomponent>
tag in the above main Component -->
<script id="child-component-template" type="text/ractive">
 <img class="ractive-logo" src="{{logoUrl}}">
 <div class="component-footer">{{info}}</div>
</script>
```

These two templates describe the DOM-structures nicely but now we need a proper mechanics to combine them together.

This is how a component definition in PureScript could looks like.

Our main Ractive instance will be created by using the `ractive` API from *purescript-ractive*.

```purescript
  let ract = ractive {
               template : "#template",
               el       : (Just "#app"),
               "data" : {
                        uiLibrary : "RactiveJS",
                        language  : "PureScript",
                        logoUrl   : "./content/img/ps-logo.png",
                        message   : "Click on the PureScript Logo!",
                        consoleMessages: "no messages",
                        canRandomize : true,
                        counter: 0,
                        numbers: []
                    },
                partials : {},
                components : {
                  "mycomponent" : component  -- we give the component the name
                                             -- of the HTML-element where it
                                             -- should mount
                }
            }
```

The Child Component will be defined *but not instantiated* via the `extend` API. The instantiation of child components is always done by their owning components.

```purescript
 let component = extend {
                   template : "#child-component-template",
                   el : Nothing,
                   "data" : {
                     info : "I'm an embedded Ractive.JS component",
                     logoUrl   : "./content/img/ractive-logo.png"
                   },
                   partials   : {},
                   components : {}
                }
```

Now we have to compile everything and reload the page.

Here's the screenshot of the <a href="https://github.com/brakmic/purescript-ractive/blob/master/demo/scripts/app.purs">demo app.</a>

<img src="http://fs5.directupload.net/images/160110/ebiof4rs.png" width="608" height="622">

For more in-depth info regarding *JavaScript* RactiveJS Component development you could read an <a href="http://blog.brakmic.com/creating-components-with-ractive-js/">article</a> of mine.

Have fun!
