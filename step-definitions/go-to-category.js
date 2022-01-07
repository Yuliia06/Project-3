module.exports = function () {

  this.Given(/^that I am on the Home page$/, async function () {
    // default page
  });

  this.When(/^I click on menu button$/, async function () {
    let elems = await driver.findElements(By.css(".ax-sidenav._md[md-component-id='sidenav-left']"));

    if (elems.length > 0) {
      return;
    }

    let menuButton = await driver.findElement(By.css("button[class='Buttonstyles__StyledButton-sc-1g4oxwr-0 eOOMDq MenuButtonstyles__StyledMenuButton-sc-hxepwf-0 hZtLOT']"));
    await menuButton.click();
  });

  this.When(/^I click on Vegetarian category button$/, async function () {
    await driver.wait(until.elementsLocated(by.css('a[href="/sortiment/vegetariskt"]')), 10000);
    await driver.executeScript('document.querySelector(\'a[href="/sortiment/vegetariskt"]\').scrollIntoView()');
    let vegetarianMenuButton = await driver.findElement(By.css('a[href="/sortiment/vegetariskt"]'));

    await vegetarianMenuButton.click();
  });

  this.Then(/^I am on the Vegetarian category page$/, async function () {
    let heading = await (await driver.findElement(By.css('.Headingstyles__StyledH2-sc-r7tfy8-1.bZncq.CategoryPage__HeadingTitle-sc-1x0gyvn-1.hslUEt'))).getText();
    expect(heading).to.equal('Vegetariskt');

    console.log('Vegetarian category page');
  });

}