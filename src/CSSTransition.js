import AnimationFrameQueue from './AnimationFrameQueue';
import { addClass, removeClass } from './DOMHelpers';

/**
 * Applies a CSS class for each stage of a CSS transition
 *
 * A transition consists of three stages:
 * 1. Start: Used to set initial transition state, e.g. display: block; opacity: 0;
 * 2. Active: Used to set the actual transitions, e.g. opacity: 1;
 * 3. Done: Used to consist the result of active, e.g. opacity: 1;
 *
 * All stages get queued via requestAnimationFrame.
 *
 * The done stage gets applied after the first transitionend event or
 * when the animationTimeout is reached.
 */
class CSSTransition {
  static get allowedDirections() {
    return ['enter', 'exit'];
  }

  /**
   * @param {HTMLElement} element - Element on which to apply the CSS classes
   * @param {string} prefix - Default: ''. Sets a prefix on all CSS classes
   * @param {number} animationTimeout - Default: 500. Time to wait for transitionend to happen
   */
  constructor(element, prefix = '', animationTimeout = 500) {
    this.element = element;
    this.prefix = prefix;
    this.animationTimeout = animationTimeout;

    this.queue = new AnimationFrameQueue();

    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.onTransitionTimeout = this.onTransitionTimeout.bind(this);
  }

  /**
   * Cleanup all previous animation state
   * @private
   * @returns {void}
   */
  cleanup() {
    this.queue.clear();

    clearTimeout(this.timeout);
    this.element.removeEventListener('transitionend', this.onTransitionEnd);

    CSSTransition.allowedDirections.forEach(direction =>
      removeClass(
        this.element,
        `${this.prefix}${direction}`,
        `${this.prefix}${direction}-active`,
        `${this.prefix}${direction}-done`
      )
    );
  }

  /**
   * Callback for when the transition has finished
   * @private
   * @returns {void}
   */
  onTransitionEnd() {
    clearTimeout(this.timeout);
    this.element.removeEventListener('transitionend', this.onTransitionEnd);

    this.queue.enqueue(() => {
      removeClass(this.element, `${this.prefix}${this.direction}-active`);
      addClass(this.element, `${this.prefix}${this.direction}-done`);
    });
  }

  /**
   * Callback for when the transition runs into timeout
   * @private
   * @returns {void}
   */
  onTransitionTimeout() {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `CSSTransition: Timeout fired on '${
          this.direction
        }'. Please check whether there is a transition on`,
        this.element
      );
    }

    this.onTransitionEnd();
  }

  /**
   * Apply CSS transition stages
   * @private
   * @param {string} direction - One of CSSTransition.allowedDirections
   * @returns {void}
   */
  run(direction) {
    if (
      process.env.NODE_ENV !== 'production' &&
      CSSTransition.allowedDirections.indexOf(direction) === -1
    ) {
      throw new Error(`Unknown direction: ${direction}`);
    }

    this.direction = direction;

    // 1. make sure no other transition is running and clean them up
    this.cleanup();

    // 2. add ${this.direction} class on first animation frame
    this.queue.enqueue(() => addClass(this.element, `${this.prefix}${this.direction}`));

    // 3. add ${this.direction}-active class on next animation frame
    this.queue.enqueue(() => {
      removeClass(this.element, `${this.prefix}${this.direction}`);
      addClass(this.element, `${this.prefix}${this.direction}-active`);
    });

    // 4.1. add enter-done class on transition end
    this.element.addEventListener('transitionend', this.onTransitionEnd);

    // 4.2. or after timeout
    this.timeout = setTimeout(this.onTransitionTimeout, this.animationTimeout);
  }

  /**
   * Apply enter CSS transition stages
   * @returns {void}
   */
  enter() {
    this.run('enter');
  }

  /**
   * Apply exit CSS transition stages
   * @returns {void}
   */
  exit() {
    this.run('exit');
  }
}

export default CSSTransition;
