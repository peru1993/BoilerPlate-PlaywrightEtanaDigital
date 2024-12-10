class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(url) {
    return await this.page.goto(url)
  }

  async getTitle() {
    return await this.page.title()
  }

  async wait() {
    return this.page.waitForTimeout(10000)
  }

  async waitAndClick(locator) {
    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });
    return await element.click();
  }

  async waitAndFill(selector, text) {
    return await this.page.fill(selector, text)
  }

  async getElementText(selector, elementName) {
    const textcontent = await this.page.locator(selector).textContent();
    console.log(`Text retrieved from "${elementName}" (Selector: "${selector}"): ${textcontent}`);
    return await textcontent.trim();
  }

  async isElementVisible(selector, elementName) {
    const elementvisible = await this.page.locator(selector).isVisible();
    console.log(`Element visibility for "${elementName}": ${elementVisible}`);
    return await elementvisible;
  }

  // async navigate(url) {
  //     await this.page.goto(url);
  // }

  // // Click on an element
  // async clickElement(locator) {
  //     await this.page.click(locator);
  // }

  // // Fill an input field
  // async sendElement(locator, text) {
  //     await this.page.fill(locator, text);
  // }

  // async locateElement(locator){
  //     return this.page.locator(locator);
  // }

}

module.exports = { BasePage };
