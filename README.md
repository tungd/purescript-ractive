
# purescript-ractive

RactiveJS bindings for PureScript (Work in progress)

Based on the original sources from <a href="https://github.com/AitorATuin/purescript-ractive" target="_blank">AitorATuin</a>

This version is compatible with **psc 0.8.0.0**.

The original Grunt mechanics were replaced by Gulp/WebPack.

For quick testing a <a href="https://github.com/brakmic/purescript-ractive/blob/master/demo/scripts/app.purs">small demo app</a> with detailed comments is available.

### Screenshot
<img src="http://fs5.directupload.net/images/160108/v6ohn28m.png" width="741" height="547">

My <a href="http://blog.brakmic.com/webapps-with-purescript-and-ractivejs/" target="_blank">article</a> on using PureScript with RactiveJS.

### Currently implemented APIs

- <a href="http://docs.ractivejs.org/latest/ractive-add" target="_blank">add</a>
- <a href="http://docs.ractivejs.org/latest/ractive-animate" target="_blank">animate</a>
- <a href="http://docs.ractivejs.org/latest/ractive-detach" target="_blank">detach</a>
- <a href="http://docs.ractivejs.org/latest/ractive-extend" target="_blank">extend</a>
- <a href="http://docs.ractivejs.org/latest/ractive-find" target="_blank">find</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findall" target="_blank">findAll</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findallcomponents" target="_blank">findAllComponents</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findcomponent" target="_blank">findComponent</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findcontainer" target="_blank">findContainer</a>
- <a href="http://docs.ractivejs.org/latest/ractive-findparent" target="_blank">findParent</a>
- <a href="http://docs.ractivejs.org/latest/ractive-fire" target="_blank">fire</a>
- <a href="http://docs.ractivejs.org/latest/ractive-get" target="_blank">get</a>
- <a href="http://docs.ractivejs.org/latest/ractive-insert" target="_blank">insert</a>
- <a href="http://docs.ractivejs.org/latest/ractive-observe" target="_blank">observe</a>
- <a href="http://docs.ractivejs.org/latest/ractive-observeonce" target="_blank">observeOnce</a>
- <a href="http://docs.ractivejs.org/latest/ractive-off" target="_blank">off</a>
- <a href="http://docs.ractivejs.org/latest/ractive-on" target="_blank">on</a>
- <a href="http://docs.ractivejs.org/latest/ractive-pop" target="_blank">pop</a>
- <a href="http://docs.ractivejs.org/latest/ractive-push" target="_blank">push</a>
- <a href="http://docs.ractivejs.org/latest/ractive-render" target="_blank">render</a>
- <a href="http://docs.ractivejs.org/latest/ractive-reset" target="_blank">reset</a>
- <a href="http://docs.ractivejs.org/latest/ractive-set" target="_blank">set</a>
- <a href="http://docs.ractivejs.org/latest/ractive-subtract" target="_blank">subtract</a>

### Component Support

Creation of RactiveJS <a href="http://docs.ractivejs.org/latest/components" target="_blank">Components</a> is supported via the `extend` API. Read the <a href="https://github.com/brakmic/purescript-ractive/blob/master/tutorials/COMPONENTS.md">Tutorial</a> for more info.

### Future planning

To map all of the <a href="http://docs.ractivejs.org/latest/get-started" target="_blank">Ractive APIs</a> to PureScript.

### Building the Bindings

```
npm install [initial build only]
bower update [initial build only]
gulp
```

### Building the Demo

```
gulp make-demo [initial build only]
gulp build-demo
open index.html from subdir demo
```

Or use HapiJS
```
npm start  [will load index.js from subdir demo]
```

### License

<a href="https://github.com/brakmic/purescript-ractive/blob/master/LICENSE">MIT</a>
