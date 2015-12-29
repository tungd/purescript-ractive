
# purescript-ractive

Ractive bindings for PureScript (Work in progress)

Based on the original sources from <a href="https://github.com/AitorATuin/purescript-ractive" target="_blank">AitorATui</a>

This version is compatible with PSC 0.8.0.0.

The original Grunt mechanics were replaced by Gulp (mostly because of compatibility issues with Grunt plugins).

For quick testing a small Demo App + WebPack-config are available.

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
```
...then open in your browser the index.html from *demo*-subdir.
