import credentials from '../fixture/credentials.js'
export default class paymentPage {
  selectors = {
    cardNameField: 'input[data-qa="name-on-card"]',
    cardNumberField: 'input[data-qa="card-number"]',
    cardCVCField: 'input[data-qa="cvc"]',
    cardExMonthField: 'input[data-qa="expiry-month"]',
    cardExYearField: 'input[data-qa="expiry-year"]',
    confirmOrderBtn: 'button[data-qa="pay-button"]',
    orderPlHeader: 'h2[data-qa="order-placed"]',
    orderConText: 'div.col-sm-9 > p'
  }

  async fillCartData ({ page }) {
    await page.fill(this.selectors.cardNameField, credentials.paymentCart.cardNameField)
    await page.fill(this.selectors.cardNumberField, credentials.paymentCart.cardNumberField)
    await page.fill(this.selectors.cardCVCField, credentials.paymentCart.cardCVCField)
    await page.fill(this.selectors.cardExMonthField, credentials.paymentCart.cardExMonthField)
    await page.fill(this.selectors.cardExYearField, credentials.paymentCart.cardExYearField)
  }
}
