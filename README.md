
# purescript-ractive

Ractive bindings for PureScript (Work in progress)

Based on the original sources from <a href="https://github.com/AitorATuin/purescript-ractive" target="_blank">AitorATui</a>

This version is compatible with PSC 0.8.0.0.

The original Grunt mechanics were replaced by Gulp (mostly because of compatibility issues with Grunt plugins).

For quick testing a small demo app is available.

<img src="http://fs5.directupload.net/images/151229/t2oktwfp.png" width="678" height="772">

## Future planning

To map the <a href="http://docs.ractivejs.org/latest/get-started" target="_blank">Ractive APIs</a> (Event Handling, Parallel DOM, Proxy Events etc.)

## Building the Bindings

```
npm install
bower update
gulp
```

## Building the Demo

```
gulp build-demo
webpack
open index.html from subdir demo
```

## License

<a href="https://github.com/brakmic/purescript-ractive/blob/master/LICENSE">MIT</a>