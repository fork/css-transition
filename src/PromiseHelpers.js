/**
 * Wait for an event to trigger once using a Promise
 * @param {HTMLElement} element - Element on which the event listener should be added
 * @param {string} type - A case-sensitive string representing the event type to listen for
 * @param {function} listener - Event listener callback
 * @returns {Promise} Promise that resolves when the element has triggered once
 */
export const promiseOnce = (element, type, listener) =>
  new Promise(resolve => {
    const cb = (...args) => {
      element.removeEventListener(type, cb);
      resolve(listener(...args));
    };
    element.addEventListener(type, cb);
  });

/**
 * Wait for a timeout using a Promise
 * @param {function} fn - A function to be executed after the timer expires
 * @param {number} delay - The time, in milliseconds, the timer should wait before fn executed
 * @returns {[timeoutID, Promise]} An Array where the first element is the timeout's ID and the second element is a Promise that resolves when the timeout triggers
 */
export const promiseTimeout = (fn, delay) => {
  let timeout;
  const promise = new Promise(resolve => {
    timeout = setTimeout(() => {
      resolve(fn());
    }, delay);
  });
  return [timeout, promise];
};
