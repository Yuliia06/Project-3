module.exports = function () {

  let addedItemsToCart;

  this.Given(/^that I have items in the shopping cart$/, async function () {
    await helpers.loadPage('https://www.willys.se/sortiment/frukt-och-gront/frukt');
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

    console.log('addedItemsToCart', addedItemsToCart);

  });

  this.When(/^I click on the shoping cart button$/, async function () {
    let cartLink = await driver.findElement(By.css('a[href="https://www.willys.se/varukorg"]'));
    let cartBUtton = await cartLink.findElement(By.css('button'));

    await cartBUtton.click();
  });

  this.Then(/^the cart should appear$/, async function () {
    // if find = good
    let cartPreview = await driver.findElement(By.css('div[data-testid="cart-preview"]'));
  });

  this.Then(/^the cart shows items with correct quantity$/, async function () {
    let cartSection = await driver.findElement(By.css('section[class="CartPreview_cart-preview-body-wrapper__dEYRh"]'));
    let cartItems = await cartSection.findElements(By.css('div[class^="ProductListItemstyles__StyledWrapper"]'));

    for (let cartItem of cartItems) {
      const name = await (await cartItem.findElement(By.css('p[title]'))).getText();
      const quantityWithSt = await (await cartItem.findElement(By.css('[aria-label="Ändra produktantal"]'))).getAttribute('value');
      const quantity = quantityWithSt.split(' ')[0];

      const item = addedItemsToCart.find(i => i.name === name);

      console.log('item', item);

      expect(item.quantity).to.not.equal(quantity);
    }
  });

}