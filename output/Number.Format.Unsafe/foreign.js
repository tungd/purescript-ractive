"use strict";

// module Number.Format.Unsafe

exports.unsafeToExponential = function (scale) {
  return function (number) {
    return function () {
      return number.toExponential(scale);
    }
  }
}

exports.unsafeToFixed = function (scale) {
  return function (number) {
    return function () {
      return number.toFixed(scale);
    }
  }
}

exports.unsafeToPrecision = function (prec) {
  return function (number) {
    return function () {
      return number.toPrecision(prec);
    }
  }
}

exports.unsafeToString = function (radix) {
  return function (number) {
    return function () {
      return number.toString(radix);
    }
  }
}
