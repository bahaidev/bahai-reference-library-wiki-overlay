// UTILS
/**
 *
 * @param {string} sel
 * @returns {HTMLElement}
 */
function $ (sel) {
  return document.querySelector(sel);
}

/**
 *
 * @param {string} sel
 * @returns {HTMLElement[]}
 */
function $$ (sel) {
  return [...document.querySelectorAll(sel)];
}

export {$, $$};
