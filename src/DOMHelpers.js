/**
 * Adds classes to a DOM element
 * @param {Element} element - Element the classes should get added to
 * @param {string} classNames - One or more classnames
 * @returns {void}
 */
export const addClass = (element, ...classNames) =>
  classNames
    .filter(className => !element.classList.contains(className))
    .forEach(className => element.classList.add(className));

/**
 * Removes classes from a DOM element
 * @param {Element} element - Element the classes should get removed from
 * @param {string} classNames - One or more classnames
 * @returns {void}
 */
export const removeClass = (element, ...classNames) =>
  classNames
    .filter(className => element.classList.contains(className))
    .forEach(className => element.classList.remove(className));
