module.exports = function () {

  this.Given(/^that we are on Willy's website$/, async function () {
    await helpers.loadPage('https://www.willys.se/');
  });

  this.Given(/^that we accepted the standard cookie policy$/, async function () {
    // the cookie accept button does not exist initially so wait for it to exist
    await driver.wait(until.elementsLocated(by.css('#onetrust-accept-btn-handler')), 10000);
    // once it exists grab the button
    let cookieAcceptButton = await driver.findElement(By.css('#onetrust-accept-btn-handler'));
    // now wait for the button to be interactable (visible) before clicking
    // check if visible/displayed, wait 1/10 of a second then check again
    while (!(await cookieAcceptButton.isDisplayed())) {
      await driver.sleep(100);
    }
    // the accept button exists and is visible so click it
    await cookieAcceptButton.click();
  });

  this.Given(/^that we have have been through the initial where to deliver popup$/, async function () {
    // Grab the plus-button of the first product and click it
    let plusButton = await driver.findElement(By.css('.ax-product-quantity-plus'));
    let body = await driver.findElement(By.css('body'));
    await plusButton.click();
    // Wait for the delivery overlay (the layer to click to remove
    // the delivery choice popup) to exist
    await driver.wait(until.elementsLocated(by.css('.ax-delivery-widget-overlay')), 10000);
    // Then grab it and click it
    let deliveryOverlay = await driver.findElement(By.css('.ax-delivery-widget-overlay'));
    await deliveryOverlay.click();
    // Grab the minus-button of the first product and click it 
    // to remove the product from the cart
    let minusButton = await driver.findElement(By.css('.ax-product-quantity-minus'));
    await minusButton.click();
    // Sleep a short while (needed if the scenario / next step
    // is loading a new url - otherwise the temp product might
    // get stuck in the cart instead of properly removed
    await driver.sleep(1000);
  });

}