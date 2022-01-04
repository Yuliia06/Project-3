module.exports = function () {

  // Common variables shared between steps and/or scenarios
  let boughtProducts;

  this.Given(/^that I am on the Fruit category page$/, async function () {
    // You could just do this:
    // await helpers.loadPage('https://www.willys.se/sortiment/frukt-och-gront/frukt');
    // But it is probably more realistic to think that the user
    // navigates by the menu link (but a little harder to automate)
    let fruktOchGrontLink = await driver.findElement(By.css('a[href="/sortiment/frukt-och-gront"]'));
    await fruktOchGrontLink.click();
    // Now we have to wait for the subcategory link for Frukt to exist
    await driver.wait(until.elementsLocated(by.css('a[href="/sortiment/frukt-och-gront/frukt"]')), 10000);
    // And then grab it
    let fruktLink = await driver.findElement(By.css('a[href="/sortiment/frukt-och-gront/frukt"]'));
    // And before we can click the link we must scroll it into view
    // (because it is inside an element with its own scroll Selenium 
    //  can't manage this - but injecting the JS s below works)
    await driver.executeScript('document.querySelector(\'a[href="/sortiment/frukt-och-gront/frukt"]\').scrollIntoView()');
    // Now we can click it
    await fruktLink.click();
    // Wait for the h2 headline (there is only one) to become "Frukt"
    // ≈ the page/view has loaded
    let h2Text;
    while (h2Text !== 'Frukt') {
      h2Text = await (await driver.findElement(By.css('h2'))).getText();
      await driver.sleep(100);
    }
  });

  this.When(/^I put a random number of each fruit that has price per piece in the cart$/, async function () {
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
    // Loop through the products 
    // and buy a random number of those you can buy per piece (kr/st)
    boughtProducts = [];
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
      let quantity = (Math.floor(Math.random() * 5) + 1) * pricePer;
      let price = +((await (await product.findElement(By.css('[class^="PriceLabel_product-price-text"]'))).getText()).split('\n').join('.').split('./st').join(''));
      // Remember name, price, quantity and pricePer for later
      boughtProducts.push({ name, quantity, price, pricePer });
      // Add the product to the cart in the right quantity
      let quantityField = await product.findElement(By.css('[aria-label="Ändra produktantal"]'));
      await quantityField.sendKeys(quantity + '', selenium.Key.ENTER);
      // Debugging our test code: Check how the boughtProducts array looks
      console.log('\n\nBOUGHT PRODUCTS:\n', boughtProducts);
    }
  });

  this.Then(/^the mini\-cart should show the correct total quantity of products$/, async function () {
    // Calculate total quantity
    let totalQuantity = 0;
    for (let { quantity } of boughtProducts) {
      totalQuantity += quantity;
    }
    // Get quantity from mini-cart
    let miniCartTotalQuantity = +(await (await driver.findElement(By.css('[class^="MiniCartstyles__StyledCounter"]'))).getText());
    // Check that the total quantity displayed in the mini-cart
    // matches our calculations
    expect(miniCartTotalQuantity).to.equal(totalQuantity);
    // Debugging our test code...
    console.log('\n\nDISPLAYED TOTAL QUANTITY IN MINI-CART:', miniCartTotalQuantity);
    console.log('CALCULATED TOTAL QUANTITY', totalQuantity);
  });

  this.Then(/^the mini\-cart should show correct total price$/, async function () {
    // Calculate total price
    let totalPrice = 0;
    for (let { quantity, price, pricePer } of boughtProducts) {
      totalPrice += quantity * price / pricePer;
    }
    // Round total calculated price to two decimals
    // (because of floating point decimal errors)
    // See:  https://ellenaua.medium.com/floating-point-errors-in-javascript-node-js-21aadd897bf8
    totalPrice = +totalPrice.toFixed(2);
    // Get quantity from mini-cart
    let miniCartTotalPrice = +(await (await driver.findElement(By.css('[class^="MiniCartstyles__StyledPrice"]'))).getText()).split(' ')[0].split(',').join('.');
    // Check that the total price displayed in the mini-cart
    // matches our calculations
    expect(miniCartTotalPrice).to.equal(totalPrice);
    // Debugging our test code...
    console.log('\n\nDISPLAYED TOTAL PRICE IN MINI-CART:', miniCartTotalPrice);
    console.log('CALCULATED TOTAL PRICE', totalPrice);
  });

}