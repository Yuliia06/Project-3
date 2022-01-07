module.exports = function () {

  let titleProduct;

  this.Given(/^that I am on the Fruit page$/, async function () {
    await helpers.loadPage('https://www.willys.se/sortiment/frukt-och-gront/frukt');
  });

  this.When(/^I click a random fruit$/, async function () {
    // Get all products on the page
    let products = await driver.findElements(By.css('[itemtype="https://schema.org/Product"]'));
    selectedProduct = products[0];

    let linkProduct = await selectedProduct.findElement(By.css('a'))
    titleProduct = await (await selectedProduct.findElement(By.css('.Product_product-name__1IyPc'))).getText();

    await linkProduct.click();
  });

  this.Then(/^the modal window should appear$/, async function () {
    await driver.wait(until.elementsLocated(by.css("span[itemprop='name']")), 10000);
  });

  this.Then(/^the modal window should show correct information details$/, async function () {
    let productDetailheader = await driver.findElement(By.css("span[itemprop='name']"));
    
    expect(await productDetailheader.getText()).to.equal(titleProduct);
  });

}