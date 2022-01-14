const { $, $$, $$$ } = require('../helpers/element-selection.js');
let slowDown = true;

async function waitAWhile() {
  await driver.sleep(slowDown ? 3000 : 0);
}
//let itemsListLength;
module.exports = function () {

  this.Given(/^I have three items in my shopping cart$/, async function () {
    await driver.wait(until.elementsLocated(by.css('a[href="/sortiment/dryck"]')), 10000);
    let openCategory = await $('a[href="/sortiment/dryck"]');
    await driver.executeScript('document.querySelector(\'a[href="/sortiment/dryck"]\').scrollIntoView()');
    await openCategory.click();
    waitAWhile();
    //Get a list of drinks and choose 3 of them to add to cart one each
    let products = await driver.findElements(By.css('[itemtype="https://schema.org/Product"]'));
    await products[0].findElement(By.css('button[title="Öka antal"]')).click();
    await products[5].findElement(By.css('button[title="Öka antal"]')).click();
    await products[9].findElement(By.css('button[title="Öka antal"]')).click();
    await driver.sleep(1000);

    //let itemsList = await $$('[class^="ProductListItemstyles__StyledWrapper"]');
    // console.log('\nThe number of different products before deleting:\n', itemsList.length);

  });
