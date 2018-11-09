// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"uME/":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * FIFO-Queue which automatically dequeues on requestAnimationFrame
 *
 * This helper class is useful to run multiple requestAnimationFrame-based
 * steps sequentially while being able to cancel all of them at any time.
 *
 * For performance reasons, requestAnimationFrame is only called while
 * the queue is not empty.
 */
var AnimationFrameQueue =
/*#__PURE__*/
function () {
  function AnimationFrameQueue() {
    _classCallCheck(this, AnimationFrameQueue);

    this.queue = [];
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
  }
  /**
   * Callback for requestAnimationFrame
   * @private
   * @returns {void}
   */


  _createClass(AnimationFrameQueue, [{
    key: "onAnimationFrame",
    value: function onAnimationFrame() {
      if (this.queue.length > 0) {
        this.dequeue()();
      }

      if (this.queue.length > 0) {
        requestAnimationFrame(this.onAnimationFrame);
      }
    }
    /**
     * Clear queue
     * @returns {void}
     */

  }, {
    key: "clear",
    value: function clear() {
      this.queue = [];
    }
    /**
     * Enqueue function onto requestAnimationFrame queue
     * @param {function} fn - Function which should be queued
     * @returns {void}
     */

  }, {
    key: "enqueue",
    value: function enqueue(fn) {
      this.queue.push(fn);

      if (this.queue.length === 1) {
        requestAnimationFrame(this.onAnimationFrame);
      }
    }
    /**
     * Retrieve oldest queue entry and remove it from queue
     * @returns {function} Oldest queue entry
     */

  }, {
    key: "dequeue",
    value: function dequeue() {
      return this.queue.shift();
    }
  }]);

  return AnimationFrameQueue;
}();

var _default = AnimationFrameQueue;
exports.default = _default;
},{}],"GzUD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeClass = exports.addClass = void 0;

/**
 * Adds classes to a DOM element
 * @param {Element} element - Element the classes should get added to
 * @param {string} classNames - One or more classnames
 * @returns {void}
 */
var addClass = function addClass(element) {
  for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classNames[_key - 1] = arguments[_key];
  }

  return classNames.filter(function (className) {
    return !element.classList.contains(className);
  }).forEach(function (className) {
    return element.classList.add(className);
  });
};
/**
 * Removes classes from a DOM element
 * @param {Element} element - Element the classes should get removed from
 * @param {string} classNames - One or more classnames
 * @returns {void}
 */


exports.addClass = addClass;

var removeClass = function removeClass(element) {
  for (var _len2 = arguments.length, classNames = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    classNames[_key2 - 1] = arguments[_key2];
  }

  return classNames.filter(function (className) {
    return element.classList.contains(className);
  }).forEach(function (className) {
    return element.classList.remove(className);
  });
};

exports.removeClass = removeClass;
},{}],"0RSs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AnimationFrameQueue = _interopRequireDefault(require("./AnimationFrameQueue"));

var _DOMHelpers = require("./DOMHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Applies a CSS class for each stage of a CSS transition
 *
 * A transition consists of three stages:
 * 1. Start: Used to set initial transition state, e.g. display: block; opacity: 0;
 * 2. Active: Used to set the actual transitions, e.g. opacity: 1;
 * 3. Done: Used to consist the result of active, e.g. opacity: 1;
 *
 * Start and active stage get queued via requestAnimationFrame.
 *
 * The done stage gets applied after the first transitionend event or
 * when the animationTimeout is reached.
 */
var CSSTransition =
/*#__PURE__*/
function () {
  _createClass(CSSTransition, null, [{
    key: "allowedDirections",
    get: function get() {
      return ['enter', 'exit'];
    }
    /**
     * @param {HTMLElement} element - Element on which to apply the CSS classes
     * @param {string} prefix - Default: ''. Sets a prefix on all CSS classes
     * @param {number} animationTimeout - Default: 500. Time to wait for transitionend to happen
     */

  }]);

  function CSSTransition(element) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var animationTimeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

    _classCallCheck(this, CSSTransition);

    this.element = element;
    this.prefix = prefix;
    this.animationTimeout = animationTimeout;
    this.queue = new _AnimationFrameQueue.default();
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.onTransitionTimeout = this.onTransitionTimeout.bind(this);
  }
  /**
   * Cleanup all previous animation state
   * @private
   * @returns {void}
   */


  _createClass(CSSTransition, [{
    key: "cleanup",
    value: function cleanup() {
      var _this = this;

      this.queue.clear();
      clearTimeout(this.timeout);
      this.element.removeEventListener('transitionend', this.onTransitionEnd);
      CSSTransition.allowedDirections.forEach(function (direction) {
        (0, _DOMHelpers.removeClass)(_this.element, "".concat(_this.prefix).concat(direction));
        (0, _DOMHelpers.removeClass)(_this.element, "".concat(_this.prefix).concat(direction, "-active"));
        (0, _DOMHelpers.removeClass)(_this.element, "".concat(_this.prefix).concat(direction, "-done"));
      });
    }
    /**
     * Callback for when the transition has finished
     * @private
     * @returns {void}
     */

  }, {
    key: "onTransitionEnd",
    value: function onTransitionEnd() {
      clearTimeout(this.timeout);
      this.element.removeEventListener('transitionend', this.onTransitionEnd);
      (0, _DOMHelpers.removeClass)(this.element, "".concat(this.prefix).concat(this.direction, "-active"));
      (0, _DOMHelpers.addClass)(this.element, "".concat(this.prefix).concat(this.direction, "-done"));
    }
    /**
     * Callback for when the transition runs into timeout
     * @private
     * @returns {void}
     */

  }, {
    key: "onTransitionTimeout",
    value: function onTransitionTimeout() {
      console.warn("CSSTransition: Timeout fired on '".concat(this.direction, "'. Please check whether there is a transition on"), this.element);
      this.onTransitionEnd();
    }
    /**
     * Apply CSS transition stages
     * @private
     * @param {string} direction - One of CSSTransition.allowedDirections
     * @returns {void}
     */

  }, {
    key: "run",
    value: function run(direction) {
      var _this2 = this;

      if (CSSTransition.allowedDirections.indexOf(direction) === -1) {
        throw new Error("Unknown direction: ".concat(direction));
      }

      this.direction = direction; // 1. make sure no other transition is running and clean them up

      this.cleanup(); // 2. add ${this.direction} class on first animation frame

      this.queue.enqueue(function () {
        (0, _DOMHelpers.addClass)(_this2.element, "".concat(_this2.prefix).concat(_this2.direction));
      }); // 3. add ${this.direction}-active class on next animation frame

      this.queue.enqueue(function () {
        (0, _DOMHelpers.removeClass)(_this2.element, "".concat(_this2.prefix).concat(_this2.direction));
        (0, _DOMHelpers.addClass)(_this2.element, "".concat(_this2.prefix).concat(_this2.direction, "-active"));
      }); // 4.1. add enter-done class on transition end

      this.element.addEventListener('transitionend', this.onTransitionEnd); // 4.2. or after timeout

      this.timeout = setTimeout(this.onTransitionTimeout, this.animationTimeout);
    }
    /**
     * Apply enter CSS transition stages
     * @returns {void}
     */

  }, {
    key: "enter",
    value: function enter() {
      this.run('enter');
    }
    /**
     * Apply exit CSS transition stages
     * @returns {void}
     */

  }, {
    key: "exit",
    value: function exit() {
      this.run('exit');
    }
  }]);

  return CSSTransition;
}();

var _default = CSSTransition;
exports.default = _default;
},{"./AnimationFrameQueue":"uME/","./DOMHelpers":"GzUD"}],"Focm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CSSTransition", {
  enumerable: true,
  get: function () {
    return _CSSTransition.default;
  }
});
Object.defineProperty(exports, "AnimationFrameQueue", {
  enumerable: true,
  get: function () {
    return _AnimationFrameQueue.default;
  }
});
exports.default = void 0;

var _CSSTransition = _interopRequireDefault(require("./CSSTransition"));

var _AnimationFrameQueue = _interopRequireDefault(require("./AnimationFrameQueue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _CSSTransition.default;
exports.default = _default;
},{"./CSSTransition":"0RSs","./AnimationFrameQueue":"uME/"}]},{},["Focm"], "CSSTransition")
//# sourceMappingURL=/index.map