// Helpers for selecting DOM elements
// so we can write less code in the step definitions

function $(cssSelector) {
  return driver.findElement(by.css(cssSelector));
}

function $$(cssSelector) {
  return driver.findElements(by.css(cssSelector));
}

function isEmptyShoppingCart(element) {
  if ($(element).then(found => !found.length))
    return true;

}
module.exports = { $, $$, isEmptyShoppingCart };