'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.assign = function (target) {
    // .length of function is 2
    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }

    return to;
  };
}

if (typeof Object.defineProperties !== 'function') {
  Object.defineProperties = function (obj, properties) {
    function convertToDescriptor(desc) {
      function hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }

      function isCallable(v) {
        // NB: modify as necessary if other values than functions are callable.
        return typeof v === 'function';
      }

      if (_typeof(desc) !== 'object' || desc === null) {
        throw new TypeError('bad desc');
      }

      var d = {};
      if (hasProperty(desc, 'enumerable')) d.enumerable = !!desc.enumerable;

      if (hasProperty(desc, 'configurable')) {
        d.configurable = !!desc.configurable;
      }

      if (hasProperty(desc, 'value')) d.value = desc.value;
      if (hasProperty(desc, 'writable')) d.writable = !!desc.writable;

      if (hasProperty(desc, 'get')) {
        var g = desc.get;

        if (!isCallable(g) && typeof g !== 'undefined') {
          throw new TypeError('bad get');
        }

        d.get = g;
      }

      if (hasProperty(desc, 'set')) {
        var s = desc.set;

        if (!isCallable(s) && typeof s !== 'undefined') {
          throw new TypeError('bad set');
        }

        d.set = s;
      }

      if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d)) {
        throw new TypeError('identity-confused descriptor');
      }

      return d;
    }

    if (_typeof(obj) !== 'object' || obj === null) throw new TypeError('bad obj');
    properties = Object(properties);
    var keys = Object.keys(properties);
    var descs = [];

    for (var i = 0; i < keys.length; i++) {
      descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
    }

    for (var i = 0; i < descs.length; i++) {
      Object.defineProperty(obj, descs[i][0], descs[i][1]);
    }

    return obj;
  };
}

var Component = function Component(props) {
  _classCallCheck(this, Component);

  this.state = {};
  this.props = props || {};
};

/* eslint-disable */

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used as references for various `Number` constants. */

var INFINITY = Infinity;
/** `Object#toString` result references. */

var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';
/** Used to match property names within property paths. */

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Detect free variable `global` from Node.js. */

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */

function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString !== 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/** Used for built-in method references. */

var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var _Symbol = root.Symbol,
    splice = arrayProto.splice;
/* Built-in method references that are verified to be native. */

var Map$1 = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */

function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear() {
  this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */

function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */

function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map$1 || ListCache)(),
    string: new Hash()
  };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */

function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */

function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -Infinity ? '-0' : result;
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */

function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */

function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */

function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */

function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = memoize(function (string) {
  string = toString(string);
  var result = [];

  if (reLeadingDot.test(string)) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -Infinity ? '-0' : result;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func !== 'function' || resolver && typeof resolver !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
} // Assign cache to `_.memoize`.


memoize.Cache = MapCache;
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray = Array.isArray;
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject(value) {
  var type = _typeof(value);

  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike(value) {
  return !!value && _typeof(value) === 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return _typeof(value) === 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */

function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = _typeof(value);

  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}
/** Used to check objects for own properties. */

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
/**
 * The base implementation of `set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */

function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }

  path = castPath(path, object);
  var length = path.length;
  var lastIndex = length - 1;
  var index = -1;
  var nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]);
    var newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;

      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }

    assignValue(nested, key, newValue);
    nested = nested[key];
  }

  return object;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */

function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @see has, hasIn, get, unset
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }] }
 *
 * set(object, 'a[0].b.c', 4)
 * console.log(object.a[0].b.c)
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5)
 * console.log(object.x[0].y.z)
 * // => 5
 */

function set$1(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

var upperCasePattern = /([A-Z])/g;

function dashify(str) {
  return str.replace(upperCasePattern, dashLower);
}

function dashLower(c) {
  return '-' + c.toLowerCase();
}

function isObject$1(val) {
  return val != null && _typeof(val) === 'object' && Array.isArray(val) === false;
}

function inlineStyle(obj) {
  if (obj == null) {
    return '';
  }

  if (typeof obj === 'string') {
    return obj;
  }

  if (obj === null || obj === undefined) {
    return '';
  }

  if (!isObject$1(obj)) {
    throw new TypeError('style 只能是一个对象或字符串。');
  }

  return Object.keys(obj).map(function (key) {
    return dashify(key).concat(':').concat(obj[key]);
  }).join(';');
}

var ENV_TYPE = {
  WEAPP: 'WEAPP',
  WEB: 'WEB',
  RN: 'RN',
  SWAN: 'SWAN',
  ALIPAY: 'ALIPAY',
  TT: 'TT',
  QQ: 'QQ'
};
function getEnv() {
  if (typeof qq !== 'undefined' && qq.getSystemInfo) {
    return ENV_TYPE.QQ;
  }

  if (typeof tt !== 'undefined' && tt.getSystemInfo) {
    return ENV_TYPE.TT;
  }

  if (typeof wx !== 'undefined' && wx.getSystemInfo) {
    return ENV_TYPE.WEAPP;
  }

  if (typeof swan !== 'undefined' && swan.getSystemInfo) {
    return ENV_TYPE.SWAN;
  }

  if (typeof my !== 'undefined' && my.getSystemInfo) {
    return ENV_TYPE.ALIPAY;
  }

  if (typeof global !== 'undefined' && global.__fbGenNativeModule) {
    return ENV_TYPE.RN;
  }

  if (typeof window !== 'undefined') {
    return ENV_TYPE.WEB;
  }

  return 'Unknown environment';
}

function isObject$2(arg) {
  return arg === Object(arg) && typeof arg !== 'function';
}

var env = null;
function getOriginal(item) {
  if (env === null) {
    env = getEnv();
  }

  if (isObject$2(item)) {
    return item[env === ENV_TYPE.SWAN ? 'privateOriginal' : '$original'] || item;
  }

  return item;
}

var Events =
/*#__PURE__*/
function () {
  function Events(opts) {
    _classCallCheck(this, Events);

    if (typeof opts !== 'undefined' && opts.callbacks) {
      this.callbacks = opts.callbacks;
    } else {
      this.callbacks = {};
    }
  }

  _createClass(Events, [{
    key: "on",
    value: function on(events, callback, context) {
      var calls, event, node, tail, list;

      if (!callback) {
        return this;
      }

      events = events.split(Events.eventSplitter);
      calls = this.callbacks;

      while (event = events.shift()) {
        list = calls[event];
        node = list ? list.tail : {};
        node.next = tail = {};
        node.context = context;
        node.callback = callback;
        calls[event] = {
          tail: tail,
          next: list ? list.next : node
        };
      }

      return this;
    }
  }, {
    key: "once",
    value: function once(events, callback, context) {
      var _this = this;

      var wrapper = function wrapper() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        callback.apply(_this, args);

        _this.off(events, wrapper, context);
      };

      this.on(events, wrapper, context);
      return this;
    }
  }, {
    key: "off",
    value: function off(events, callback, context) {
      var event, calls, node, tail, cb, ctx;

      if (!(calls = this.callbacks)) {
        return this;
      }

      if (!(events || callback || context)) {
        delete this.callbacks;
        return this;
      }

      events = events ? events.split(Events.eventSplitter) : Object.keys(calls);

      while (event = events.shift()) {
        node = calls[event];
        delete calls[event];

        if (!node || !(callback || context)) {
          continue;
        }

        tail = node.tail;

        while ((node = node.next) !== tail) {
          cb = node.callback;
          ctx = node.context;

          if (callback && cb !== callback || context && ctx !== context) {
            this.on(event, cb, ctx);
          }
        }
      }

      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(events) {
      var event, node, calls, tail, rest;

      if (!(calls = this.callbacks)) {
        return this;
      }

      events = events.split(Events.eventSplitter);
      rest = [].slice.call(arguments, 1);

      while (event = events.shift()) {
        if (node = calls[event]) {
          tail = node.tail;

          while ((node = node.next) !== tail) {
            node.callback.apply(node.context || this, rest);
          }
        }
      }

      return this;
    }
  }]);

  return Events;
}();

Events.eventSplitter = /\s+/;

function render() {}

function createRef() {
  return {
    current: null
  };
}
/**
 * 赋值 ref
 * @param {Object} ref ref 对象/ref 函数/ref 字符串
 * @param {Object} target dom/component
 * @param {Object} component 组件实例
 * @param {Object} refs 字符串 ref 搜集器
 */

function commitAttachRef(ref, target, component, refs) {
  var isInit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isInit && !target) return;

  if ('refName' in ref && ref['refName']) {
    refs[ref.refName] = target;
  } else if ('fn' in ref && typeof ref['fn'] === 'function') {
    ref['fn'].call(component, target);
  } else if (ref['fn'] && _typeof(ref['fn']) === 'object' && 'current' in ref['fn']) {
    ref['fn'].current = target;
  }
}
function detachAllRef(component) {
  if (component['$$refs'] && component['$$refs'].length > 0) {
    component['$$refs'].forEach(function (ref) {
      if (typeof ref['fn'] === 'function') {
        ref['fn'].call(component, null);
      } else if (ref['fn'] && _typeof(ref['fn']) === 'object' && 'current' in ref['fn']) {
        ref['fn'].current = null;
      }

      if ('target' in ref) delete ref['target'];
    });
    component.refs = {};
  }
}

var Chain =
/*#__PURE__*/
function () {
  function Chain(requestParams) {
    var interceptors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Chain);

    this.index = index;
    this.requestParams = requestParams;
    this.interceptors = interceptors;
  }

  _createClass(Chain, [{
    key: "proceed",
    value: function proceed(requestParams) {
      this.requestParams = requestParams;

      if (this.index >= this.interceptors.length) {
        throw new Error('chain 参数错误, 请勿直接修改 request.chain');
      }

      var nextInterceptor = this._getNextInterceptor();

      var nextChain = this._getNextChain();

      return nextInterceptor(nextChain).catch(function (err) {
        return Promise.reject(err);
      });
    }
  }, {
    key: "_getNextInterceptor",
    value: function _getNextInterceptor() {
      return this.interceptors[this.index];
    }
  }, {
    key: "_getNextChain",
    value: function _getNextChain() {
      return new Chain(this.requestParams, this.interceptors, this.index + 1);
    }
  }]);

  return Chain;
}();

var Link =
/*#__PURE__*/
function () {
  function Link(interceptor) {
    _classCallCheck(this, Link);

    this.taroInterceptor = interceptor;
    this.chain = new Chain();
  }

  _createClass(Link, [{
    key: "request",
    value: function request(requestParams) {
      this.chain.interceptors.push(this.taroInterceptor);
      return this.chain.proceed(_objectSpread({}, requestParams));
    }
  }, {
    key: "addInterceptor",
    value: function addInterceptor(interceptor) {
      this.chain.interceptors.push(interceptor);
    }
  }, {
    key: "cleanInterceptors",
    value: function cleanInterceptors() {
      this.chain = new Chain();
    }
  }]);

  return Link;
}();

function timeoutInterceptor(chain) {
  var requestParams = chain.requestParams;
  return new Promise(function (resolve, reject) {
    var timeout = setTimeout(function () {
      timeout = null;
      reject(new Error('网络链接超时,请稍后再试！'));
    }, requestParams && requestParams.timeout || 60000);
    chain.proceed(requestParams).then(function (res) {
      if (!timeout) return;
      clearTimeout(timeout);
      resolve(res);
    }).catch(function (err) {
      timeout && clearTimeout(timeout);
      reject(err);
    });
  });
}
function logInterceptor(chain) {
  var requestParams = chain.requestParams;
  var method = requestParams.method,
      data = requestParams.data,
      url = requestParams.url;
  console.log("http ".concat(method || 'GET', " --> ").concat(url, " data: "), data);
  return chain.proceed(requestParams).then(function (res) {
    console.log("http <-- ".concat(url, " result:"), res);
    return res;
  });
}

var interceptors = /*#__PURE__*/Object.freeze({
  timeoutInterceptor: timeoutInterceptor,
  logInterceptor: logInterceptor
});

var onAndSyncApis = {
  onSocketOpen: true,
  onSocketError: true,
  onSocketMessage: true,
  onSocketClose: true,
  onBackgroundAudioPlay: true,
  onBackgroundAudioPause: true,
  onBackgroundAudioStop: true,
  onNetworkStatusChange: true,
  onAccelerometerChange: true,
  onCompassChange: true,
  onBluetoothAdapterStateChange: true,
  onBluetoothDeviceFound: true,
  onBLEConnectionStateChange: true,
  onBLECharacteristicValueChange: true,
  onBeaconUpdate: true,
  onBeaconServiceChange: true,
  onUserCaptureScreen: true,
  onHCEMessage: true,
  onGetWifiList: true,
  onWifiConnected: true,
  setStorageSync: true,
  getStorageSync: true,
  getStorageInfoSync: true,
  removeStorageSync: true,
  clearStorageSync: true,
  getSystemInfoSync: true,
  getExtConfigSync: true,
  getLogManager: true,
  onMemoryWarning: true,
  reportMonitor: true,
  reportAnalytics: true,
  navigateToSmartGameProgram: true,
  // 文件
  getFileSystemManager: true,
  getLaunchOptionsSync: true,
  onPageNotFound: true,
  onError: true,
  onAppShow: true,
  onAppHide: true,
  offPageNotFound: true,
  offError: true,
  offAppShow: true,
  offAppHide: true
};
var noPromiseApis = {
  // 媒体
  stopRecord: true,
  getRecorderManager: true,
  pauseVoice: true,
  stopVoice: true,
  pauseBackgroundAudio: true,
  stopBackgroundAudio: true,
  getBackgroundAudioManager: true,
  createAudioContext: true,
  createInnerAudioContext: true,
  createVideoContext: true,
  createCameraContext: true,
  createLivePlayerContext: true,
  createLivePusherContext: true,
  // 位置
  createMapContext: true,
  // 设备
  canIUse: true,
  startAccelerometer: true,
  stopAccelerometer: true,
  startCompass: true,
  stopCompass: true,
  // 界面
  hideToast: true,
  hideLoading: true,
  showNavigationBarLoading: true,
  hideNavigationBarLoading: true,
  createAnimation: true,
  createSelectorQuery: true,
  createOffscreenCanvas: true,
  createCanvasContext: true,
  // createContext: true,
  drawCanvas: true,
  hideKeyboard: true,
  stopPullDownRefresh: true,
  createIntersectionObserver: true,
  // 菜单
  getMenuButtonBoundingClientRect: true,
  onWindowResize: true,
  offWindowResize: true,
  // 拓展接口
  arrayBufferToBase64: true,
  base64ToArrayBuffer: true,
  getAccountInfoSync: true,
  getUpdateManager: true,
  createWorker: true,
  // 广告
  createRewardedVideoAd: true,
  createInterstitialAd: true
};
var otherApis = {
  // 网络
  uploadFile: true,
  downloadFile: true,
  connectSocket: true,
  sendSocketMessage: true,
  closeSocket: true,
  // 媒体
  chooseImage: true,
  chooseMessageFile: true,
  previewImage: true,
  getImageInfo: true,
  compressImage: true,
  saveImageToPhotosAlbum: true,
  startRecord: true,
  playVoice: true,
  setInnerAudioOption: true,
  getAvailableAudioSources: true,
  getBackgroundAudioPlayerState: true,
  playBackgroundAudio: true,
  seekBackgroundAudio: true,
  chooseVideo: true,
  saveVideoToPhotosAlbum: true,
  loadFontFace: true,
  // 文件
  saveFile: true,
  getFileInfo: true,
  getSavedFileList: true,
  getSavedFileInfo: true,
  removeSavedFile: true,
  openDocument: true,
  // 数据缓存
  setStorage: true,
  getStorage: true,
  getStorageInfo: true,
  removeStorage: true,
  clearStorage: true,
  // 导航
  navigateBack: true,
  navigateTo: true,
  redirectTo: true,
  switchTab: true,
  reLaunch: true,
  // 位置
  getLocation: true,
  chooseLocation: true,
  openLocation: true,
  // 设备
  getSystemInfo: true,
  getNetworkType: true,
  makePhoneCall: true,
  scanCode: true,
  setClipboardData: true,
  getClipboardData: true,
  openBluetoothAdapter: true,
  closeBluetoothAdapter: true,
  getBluetoothAdapterState: true,
  startBluetoothDevicesDiscovery: true,
  stopBluetoothDevicesDiscovery: true,
  getBluetoothDevices: true,
  getConnectedBluetoothDevices: true,
  createBLEConnection: true,
  closeBLEConnection: true,
  getBLEDeviceServices: true,
  getBLEDeviceCharacteristics: true,
  readBLECharacteristicValue: true,
  writeBLECharacteristicValue: true,
  notifyBLECharacteristicValueChange: true,
  startBeaconDiscovery: true,
  stopBeaconDiscovery: true,
  getBeacons: true,
  setScreenBrightness: true,
  getScreenBrightness: true,
  setKeepScreenOn: true,
  vibrateLong: true,
  vibrateShort: true,
  addPhoneContact: true,
  getHCEState: true,
  startHCE: true,
  stopHCE: true,
  sendHCEMessage: true,
  startWifi: true,
  stopWifi: true,
  connectWifi: true,
  getWifiList: true,
  setWifiList: true,
  getConnectedWifi: true,
  // 界面
  pageScrollTo: true,
  showToast: true,
  showLoading: true,
  showModal: true,
  showActionSheet: true,
  setNavigationBarTitle: true,
  setNavigationBarColor: true,
  setTabBarBadge: true,
  removeTabBarBadge: true,
  showTabBarRedDot: true,
  hideTabBarRedDot: true,
  setTabBarStyle: true,
  setTabBarItem: true,
  showTabBar: true,
  hideTabBar: true,
  setTopBarText: true,
  startPullDownRefresh: true,
  canvasToTempFilePath: true,
  canvasGetImageData: true,
  canvasPutImageData: true,
  setBackgroundColor: true,
  setBackgroundTextStyle: true,
  // 第三方平台
  getExtConfig: true,
  // 开放接口
  login: true,
  checkSession: true,
  authorize: true,
  getUserInfo: true,
  checkIsSupportFacialRecognition: true,
  startFacialRecognitionVerify: true,
  startFacialRecognitionVerifyAndUploadVideo: true,
  faceVerifyForPay: true,
  requestPayment: true,
  showShareMenu: true,
  hideShareMenu: true,
  updateShareMenu: true,
  getShareInfo: true,
  chooseAddress: true,
  addCard: true,
  openCard: true,
  openSetting: true,
  getSetting: true,
  getWeRunData: true,
  navigateToMiniProgram: true,
  navigateBackMiniProgram: true,
  chooseInvoice: true,
  chooseInvoiceTitle: true,
  checkIsSupportSoterAuthentication: true,
  startSoterAuthentication: true,
  checkIsSoterEnrolledInDevice: true,
  setEnableDebug: true,
  // 百度小程序专有 API
  // 百度小程序 AI 相关
  ocrIdCard: true,
  ocrBankCard: true,
  ocrDrivingLicense: true,
  ocrVehicleLicense: true,
  textReview: true,
  textToAudio: true,
  imageAudit: true,
  advancedGeneralIdentify: true,
  objectDetectIdentify: true,
  carClassify: true,
  dishClassify: true,
  logoClassify: true,
  animalClassify: true,
  plantClassify: true,
  setPageInfo: true,
  // 用户信息
  getSwanId: true,
  // 百度收银台支付
  requestPolymerPayment: true,
  // 打开小程序
  navigateToSmartProgram: true,
  navigateBackSmartProgram: true,
  preloadSubPackage: true
};

function initPxTransform(config) {
  var _config$designWidth = config.designWidth,
      designWidth = _config$designWidth === undefined ? 700 : _config$designWidth,
      _config$deviceRatio = config.deviceRatio,
      deviceRatio = _config$deviceRatio === undefined ? {
    '640': 1.17,
    '750': 1,
    '828': 0.905
  } : _config$deviceRatio;
  this.config = this.config || {};
  this.config.designWidth = designWidth;
  this.config.deviceRatio = deviceRatio;
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is

function objectIs(x, y) {
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } // eslint-disable-next-line no-self-compare


  return x !== x && y !== y;
}
function isFunction$1(arg) {
  return typeof arg === 'function';
}
var defer = typeof Promise === 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
function isUndefined(o) {
  return o === undefined;
}
function isArray$1(arg) {
  return Array.isArray(arg);
}
function isNullOrUndef(o) {
  return isUndefined(o) || o === null;
}

var Current = {
  current: null,
  index: 0
};

function getHooks(index) {
  if (Current.current === null) {
    throw new Error("invalid hooks call: hooks can only be called in a stateless component.");
  }

  var hooks = Current.current.hooks;

  if (index >= hooks.length) {
    hooks.push({});
  }

  return hooks[index];
}

function useState(initialState) {
  if (isFunction$1(initialState)) {
    initialState = initialState();
  }

  var hook = getHooks(Current.index++);

  if (!hook.state) {
    hook.component = Current.current;
    hook.state = [initialState, function (action) {
      hook.state[0] = isFunction$1(action) ? action(hook.state[0]) : action;
      hook.component._disable = false;
      hook.component.setState({});
    }];
  }

  return hook.state;
}
function useReducer(reducer, initialState, initializer) {
  if (isFunction$1(initialState)) {
    initialState = initialState();
  }

  var hook = getHooks(Current.index++);

  if (!hook.state) {
    hook.component = Current.current;
    hook.state = [isUndefined(initializer) ? initialState : initializer(initialState), function (action) {
      hook.state[0] = reducer(hook.state[0], action);
      hook.component._disable = false;
      hook.component.setState({});
    }];
  }

  return hook.state;
}

function areDepsChanged(prevDeps, deps) {
  if (isNullOrUndef(prevDeps) || isNullOrUndef(deps)) {
    return true;
  }

  return deps.some(function (d, i) {
    return !objectIs(d, prevDeps[i]);
  });
}

function invokeEffects(component, delay) {
  var effects = delay ? component.effects : component.layoutEffects;
  effects.forEach(function (hook) {
    if (isFunction$1(hook.cleanup)) {
      hook.cleanup();
    }

    var result = hook.effect();

    if (isFunction$1(result)) {
      hook.cleanup = result;
    }
  });

  if (delay) {
    component.effects = [];
  } else {
    component.layoutEffects = [];
  }
}
var scheduleEffectComponents = [];

function invokeScheduleEffects(component) {
  if (!component._afterScheduleEffect) {
    component._afterScheduleEffect = true;
    scheduleEffectComponents.push(component);

    if (scheduleEffectComponents.length === 1) {
      defer(function () {
        setTimeout(function () {
          scheduleEffectComponents.forEach(function (c) {
            c._afterScheduleEffect = false;
            invokeEffects(c, true);
          });
          scheduleEffectComponents = [];
        }, 0);
      });
    }
  }
}

function useEffectImpl(effect, deps, delay) {
  var hook = getHooks(Current.index++);

  if (Current.current._disableHooks || !Current.current.__isReady) {
    return;
  }

  if (areDepsChanged(hook.deps, deps)) {
    hook.effect = effect;
    hook.deps = deps;

    if (delay) {
      Current.current.effects = Current.current.effects.concat(hook);
      invokeScheduleEffects(Current.current);
    } else {
      Current.current.layoutEffects = Current.current.layoutEffects.concat(hook);
    }
  }
}

function useEffect(effect, deps) {
  useEffectImpl(effect, deps, true);
}
function useLayoutEffect(effect, deps) {
  useEffectImpl(effect, deps);
}
function useRef(initialValue) {
  var hook = getHooks(Current.index++);

  if (!hook.ref) {
    hook.ref = {
      current: initialValue
    };
  }

  return hook.ref;
}
function useMemo(factory, deps) {
  var hook = getHooks(Current.index++);

  if (areDepsChanged(hook.deps, deps)) {
    hook.deps = deps;
    hook.callback = factory;
    hook.value = factory();
  }

  return hook.value;
}
function useCallback(callback, deps) {
  return useMemo(function () {
    return callback;
  }, deps);
}
function useImperativeHandle(ref, init, deps) {
  useLayoutEffect(function () {
    if (isFunction$1(ref)) {
      ref(init());
      return function () {
        return ref(null);
      };
    } else if (!isUndefined(ref)) {
      ref.current = init();
      return function () {
        delete ref.current;
      };
    }
  }, isArray$1(deps) ? deps.concat([ref]) : undefined);
}
function useContext(_ref) {
  var context = _ref.context;
  var emiter = context.emiter;

  if (emiter === null) {
    return context._defaultValue;
  }

  var hook = getHooks(Current.index++);

  if (isUndefined(hook.context)) {
    hook.context = true;
    hook.component = Current.current;
    emiter.on(function (_) {
      if (hook.component) {
        hook.component._disable = false;
        hook.component.setState({});
      }
    });
  }

  return emiter.value;
}

var Emiter =
/*#__PURE__*/
function () {
  function Emiter(value) {
    _classCallCheck(this, Emiter);

    this.value = value;
    this.handlers = [];
  }

  _createClass(Emiter, [{
    key: "on",
    value: function on(handler) {
      this.handlers.push(handler);
    }
  }, {
    key: "off",
    value: function off(handler) {
      this.handlers = this.handlers.filter(function (h) {
        return h !== handler;
      });
    }
  }, {
    key: "set",
    value: function set(value) {
      var _this = this;

      if (objectIs(value, this.value)) {
        return;
      }

      this.value = value;
      this.handlers.forEach(function (h) {
        return h(_this.value);
      });
    }
  }]);

  return Emiter;
}();

var contextUid = 0;
function createContext(defaultValue) {
  var contextId = '__context_' + contextUid++ + '__';
  var context = {
    emiter: null,
    _id: contextId,
    _defaultValue: defaultValue
  };

  function Provider(newValue) {
    var emiter = context.emiter;

    if (!emiter) {
      context.emiter = new Emiter(defaultValue);
    } else {
      emiter.set(newValue);
    }
  }

  return {
    Provider: Provider,
    context: context
  };
}

function memo(component, propsAreEqual) {
  component.prototype.shouldComponentUpdate = function (nextProps) {
    return isFunction$1(propsAreEqual) ? !propsAreEqual(this.props, nextProps) : !objectIs(this.props, nextProps);
  };

  return component;
}

/* eslint-disable camelcase */
var eventCenter = new Events();
var index = {
  Component: Component,
  Events: Events,
  eventCenter: eventCenter,
  getEnv: getEnv,
  ENV_TYPE: ENV_TYPE,
  render: render,
  internal_safe_get: get,
  internal_safe_set: set$1,
  internal_inline_style: inlineStyle,
  internal_get_original: getOriginal,
  noPromiseApis: noPromiseApis,
  onAndSyncApis: onAndSyncApis,
  otherApis: otherApis,
  initPxTransform: initPxTransform,
  createRef: createRef,
  commitAttachRef: commitAttachRef,
  detachAllRef: detachAllRef,
  Link: Link,
  interceptors: interceptors,
  Current: Current,
  useEffect: useEffect,
  useLayoutEffect: useLayoutEffect,
  useReducer: useReducer,
  useState: useState,
  useRef: useRef,
  useCallback: useCallback,
  useMemo: useMemo,
  useImperativeHandle: useImperativeHandle,
  invokeEffects: invokeEffects,
  useContext: useContext,
  createContext: createContext,
  memo: memo
};

exports.Component = Component;
exports.Events = Events;
exports.eventCenter = eventCenter;
exports.getEnv = getEnv;
exports.ENV_TYPE = ENV_TYPE;
exports.render = render;
exports.internal_safe_get = get;
exports.internal_safe_set = set$1;
exports.internal_inline_style = inlineStyle;
exports.internal_get_original = getOriginal;
exports.noPromiseApis = noPromiseApis;
exports.onAndSyncApis = onAndSyncApis;
exports.otherApis = otherApis;
exports.initPxTransform = initPxTransform;
exports.createRef = createRef;
exports.commitAttachRef = commitAttachRef;
exports.detachAllRef = detachAllRef;
exports.Link = Link;
exports.interceptors = interceptors;
exports.Current = Current;
exports.useEffect = useEffect;
exports.useLayoutEffect = useLayoutEffect;
exports.useReducer = useReducer;
exports.useState = useState;
exports.useRef = useRef;
exports.useCallback = useCallback;
exports.useMemo = useMemo;
exports.useImperativeHandle = useImperativeHandle;
exports.invokeEffects = invokeEffects;
exports.useContext = useContext;
exports.createContext = createContext;
exports.memo = memo;
exports.default = index;
//# sourceMappingURL=index.js.map