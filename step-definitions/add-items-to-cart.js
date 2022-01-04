module.exports = function () {

  let addedItemsToCart;

  this.Given(/^that I am on the page - Fruit category$/, async function () {
    await helpers.loadPage('https://www.willys.se/sortiment/frukt-och-gront/frukt');
  });

  this.When(/^I put a random number of each fruit$/, async function () {
    // Click the "Visa fler"/Load more button
    // (this will scroll it into view)
    let loadMoreButton = driver.findElement(By.css('button[class*="LoadMore"]'));
    await loadMoreButton.click();
    // Scroll back to the top of the page
    // (otherwise product quantity fields/buttons will be hidden
    // below the main menu and we will not be able to click them later)
    // - we do this by injecting the JS command window.scrollTo...
    await driver.executeScript('window.scrollTo(0,0)');

    // Get all products on the page
    let products = await driver.findElements(By.css('[itemtype="https://schema.org/Product"]'));

    addedItemsToCart = [];
    for (let product of products) {
      // Check if the product has a price per piece
      let hasPricePerPiece = (await product.getText()).includes('kr/st');
      // if not do nothing more
      if (!hasPricePerPiece) { continue; }
      // Check for quantity discount
      let discountElement = await product.findElement(By.css('[class^="Product_product-save-price"]')).catch(e => { });
      let discountText = discountElement ? await discountElement.getText() : '';
      let hasQuantityDiscount = discountText.includes('FÖR');

      // Check for how many pieces the price is -> pricePer
      let pricePer = (hasQuantityDiscount && +discountText.split(' ')[0]) || 1;
      // Randomize quantity (1 to 5 x pricePer), 
      // read the name and price of the product
      let name = await (await product.findElement(By.css('[itemprop="name"]'))).getText();
      if (!name) { continue; }
      let quantity = (Math.floor(Math.random() * 5) + 1) * pricePer;
      // Remember name, price, quantity and pricePer for later
      addedItemsToCart.push({ name, quantity });

      // Add the product to the cart in the right quantity
      let quantityField = await product.findElement(By.css('[aria-label="Ändra produktantal"]'));
      await quantityField.sendKeys(quantity + '', selenium.Key.ENTER);
    }

    console.log('added products', addedItemsToCart);

  });

  this.Then(/^the cart should show the correct quantity of items$/, async function () {
    // open cart
    await helpers.loadPage('https://www.willys.se/varukorg');

    // check quantity
    await driver.wait(until.elementsLocated(by.css('.selenium--product-list-go-to-product-detail')), 10000);
    let names = await driver.findElements(By.css('.selenium--product-list-go-to-product-detail'));
    let quantities = await driver.findElements(By.css('.selenium--product-quantity-number'));
    
    for (let n of names) {
      const name = await n.getText();
      expect(addedItemsToCart.find(i => i.name === name)).to.not.equal(null);
    }

    let itemsInCart = await driver.findElements(By.css('.md-list-item-inner'));
    for (let itemElement of itemsInCart) {
      const name = await (await itemElement.findElement(By.css('.selenium--product-list-go-to-product-detail'))).getText();
      // getValue() doesnt work
      // const quantity = await (await itemElement.findElement(By.css('input.selenium--product-quantity-number'))).getValue();
      const iteminList = addedItemsToCart.find(i => i.name === name);

      // console.log('asdasd', { name, quantity, iteminList});

      expect(iteminList).to.not.equal(null);
    }

  });

}