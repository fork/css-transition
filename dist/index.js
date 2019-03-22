'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

/**
 * FIFO-Queue which automatically dequeues on `requestAnimationFrame`
 *
 * This helper class is useful to run multiple `requestAnimationFrame`-based
 * steps sequentially while being able to cancel all of them at any time.
 *
 * For performance reasons, `requestAnimationFrame` is only called while
 * the queue is not empty.
 */
var AnimationFrameQueue =
/*#__PURE__*/
function () {
  /**
   * Create an AnimationFrameQueue
   */
  function AnimationFrameQueue() {
    _classCallCheck(this, AnimationFrameQueue);

    this.queue = [];
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
  }
  /**
   * Callback for `requestAnimationFrame`
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
     * Enqueue function onto `requestAnimationFrame` queue
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

/**
 * Adds classes to a DOM element
 * @private
 * @param {Element} element - Element the classes should get added to
 * @param {string} classNames - One or more classnames
 * @returns {void}
 */
var addClass = function addClass(element) {
  for (var _len = arguments.length, classNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classNames[_key - 1] = arguments[_key];
  }

  return classNames.forEach(function (className) {
    return element.classList.add(className);
  });
};
/**
 * Removes classes from a DOM element
 * @private
 * @param {Element} element - Element the classes should get removed from
 * @param {string} classNames - One or more classnames
 * @returns {void}
 */

var removeClass = function removeClass(element) {
  for (var _len2 = arguments.length, classNames = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    classNames[_key2 - 1] = arguments[_key2];
  }

  return classNames.forEach(function (className) {
    return element.classList.remove(className);
  });
};

/**
 * Applies a CSS class for each stage of a CSS transition
 *
 * A transition consists of three stages:
 *
 * 1. **Start:** Used to set initial transition state, e.g. `display: block; opacity: 0;`
 * 2. **Active:** Used to set the actual transitions, e.g. `opacity: 1;`
 * 3. **Done:** Used to consist the result of active, e.g. `opacity: 1;` Used in exit transition to set `display: none;`
 *
 * All stages get queued via `requestAnimationFrame`.
 *
 * The done stage gets applied after the first `transitionend` event or
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
     * Create a CSSTransition
     * @param {HTMLElement} element - Element on which to apply the CSS classes
     * @param {Object} config - Configuration
     * @param {number} [config.animationTimeout=500] - Time to wait for `transitionend` to happen
     * @param {string} [config.prefix=''] - Sets a prefix on all CSS classes
     */

  }]);

  function CSSTransition(element, config) {
    _classCallCheck(this, CSSTransition);

    this.element = element;
    this.config = Object.assign({
      animationTimeout: 500,
      prefix: ''
    }, config);
    this.queue = new AnimationFrameQueue();
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
        return removeClass(_this.element, "".concat(_this.config.prefix).concat(direction), "".concat(_this.config.prefix).concat(direction, "-active"), "".concat(_this.config.prefix).concat(direction, "-done"));
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
      var _this2 = this;

      clearTimeout(this.timeout);
      this.element.removeEventListener('transitionend', this.onTransitionEnd);
      this.queue.enqueue(function () {
        removeClass(_this2.element, "".concat(_this2.config.prefix).concat(_this2.direction, "-active"));
        addClass(_this2.element, "".concat(_this2.config.prefix).concat(_this2.direction, "-done"));
      });
    }
    /**
     * Callback for when the transition runs into timeout
     * @private
     * @returns {void}
     */

  }, {
    key: "onTransitionTimeout",
    value: function onTransitionTimeout() {
      if (process.env.NODE_ENV !== 'production') {
        console.warn("CSSTransition: Timeout fired on '".concat(this.direction, " after ").concat(this.config.animationTimeout, "ms'. Please check whether there is a transition on"), this.element);
      }

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
      var _this3 = this;

      if (process.env.NODE_ENV !== 'production' && CSSTransition.allowedDirections.indexOf(direction) === -1) {
        throw new Error("Unknown direction: ".concat(direction));
      }

      this.direction = direction; // 1. make sure no other transition is running and clean them up

      this.cleanup(); // 2. add ${this.direction} class on first animation frame

      this.queue.enqueue(function () {
        return addClass(_this3.element, "".concat(_this3.config.prefix).concat(_this3.direction));
      }); // 3. add ${this.direction}-active class on next animation frame

      this.queue.enqueue(function () {
        removeClass(_this3.element, "".concat(_this3.config.prefix).concat(_this3.direction));
        addClass(_this3.element, "".concat(_this3.config.prefix).concat(_this3.direction, "-active"));
      }); // 4.1. add enter-done class on transition end

      this.element.addEventListener('transitionend', this.onTransitionEnd); // 4.2. or after timeout

      this.timeout = setTimeout(this.onTransitionTimeout, this.config.animationTimeout);
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

exports.AnimationFrameQueue = AnimationFrameQueue;
exports.CSSTransition = CSSTransition;
exports.default = CSSTransition;
