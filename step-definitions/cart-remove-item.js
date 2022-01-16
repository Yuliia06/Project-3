const { $, $$ } = require('../helpers/element-selection.js');
let slowDown = true;

async function waitAWhile() {
  await driver.sleep(slowDown ? 5000 : 0);
}
let productListLength;
let productText;

module.exports = function () {


  this.Given(/^There are three items in my shopping cart$/, async function () {
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
    await helpers.loadPage('https://www.willys.se/varukorg');

  });

  this.When(/^I regret the first product on the shopping cart$/, async function () {
    await driver.sleep(10000);
    let itemsList = await $$('[class^="ProductListItemstyles__StyledWrapper"]');
    productListLength = itemsList.length;
    console.log('\nThe number of different products before deleting:\n', productListLength);
  });

  this.Then(/^click x to remove product$/, async function () {
    await driver.sleep(2000);

    let removeButton = await driver.findElement(By.css('button[aria-label="Ta bort"]'))
    await removeButton.click();
      await driver.sleep(2000);
    let allButtons = await driver.findElements(By.css("button"));
    for(let button of allButtons){
        let buttonText = await button.getText();
        if(buttonText == "Ta bort"){
          await button.click();
        }
    }
    waitAWhile();
  });
  this.Then(/^the item should not be in the cart anymore$/, async function () {

    await driver.sleep(3000);
    let removeButtons = await driver.findElements(By.css('button[aria-label="Ta bort"]'))
    console.log(removeButtons.length)
    expect(removeButtons.length).to.equal(2)
    });

}
