/**
 * FIFO-Queue which automatically dequeues on `requestAnimationFrame`
 *
 * This helper class is useful to run multiple `requestAnimationFrame`-based
 * steps sequentially while being able to cancel all of them at any time.
 *
 * For performance reasons, `requestAnimationFrame` is only called while
 * the queue is not empty.
 */
class AnimationFrameQueue {
  /**
   * Create an AnimationFrameQueue
   */
  constructor() {
    this.queue = [];
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
  }

  /**
   * Callback for `requestAnimationFrame`
   * @private
   * @returns {void}
   */
  onAnimationFrame() {
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
  clear() {
    this.queue = [];
  }

  /**
   * Enqueue function onto `requestAnimationFrame` queue
   * @param {function} fn - Function which should be queued
   * @returns {void}
   */
  enqueue(fn) {
    this.queue.push(fn);

    if (this.queue.length === 1) {
      requestAnimationFrame(this.onAnimationFrame);
    }
  }

  /**
   * Retrieve oldest queue entry and remove it from queue
   * @returns {function} Oldest queue entry
   */
  dequeue() {
    return this.queue.shift();
  }
}

export default AnimationFrameQueue;
