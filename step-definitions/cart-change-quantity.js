module.exports = function () {
  let addedItemsToCart = [];

  this.Given(/^that I have an item in the shopping cart$/, async function () {
    await helpers.loadPage('https://www.willys.se/sortiment/frukt-och-gront/frukt');

    // Get all products on the page
    let products = await driver.findElements(By.css('[itemtype="https://schema.org/Product"]'));

    for (let product of products) {

      // check if cart has at least one item
      // stop adding other items
      if (addedItemsToCart.length > 0) { continue; }

      let name = await (await product.findElement(By.css('[itemprop="name"]'))).getText();
      if (!name) { continue; }
      let quantity = (Math.floor(Math.random() * 5) + 1);
      // Remember name, price, quantity and pricePer for later
      addedItemsToCart.push({ name, quantity });

      // Add the product to the cart in the right quantity
      let quantityField = await product.findElement(By.css('[aria-label="Ändra produktantal"]'));
      await quantityField.sendKeys(quantity + '', selenium.Key.ENTER);
    }

    console.log('added products', addedItemsToCart);
  });

  this.Given(/^that I have opened cart$/, async function () {
    // open cart
    await helpers.loadPage('https://www.willys.se/varukorg');
  });

  this.When(/^I click on increase quantity button of the item in the cart$/, async function () {
    await driver.wait(until.elementsLocated(by.css('button[aria-label="Lägg till 1 styck i varukorgen"]')), 10000);
    let buttonIncrease = await driver.findElement(By.css('button[aria-label="Lägg till 1 styck i varukorgen"]'));

    await buttonIncrease.click();

    // wait until value in input will be updated
    await driver.sleep(1000);
  });

  this.Then(/^the cart should show the correct total quantity of products$/, async function () {
    await driver.wait(until.elementsLocated(by.css('input[name="quantity"]')), 10000);
    let inputQuantity = await driver.findElement(By.css('input[name="quantity"]'));

    const quantityValue = await inputQuantity.getAttribute('value');
    console.log('quantityValue', quantityValue);

    expect(Number(quantityValue)).to.equal(addedItemsToCart[0].quantity + 1);
  });
}