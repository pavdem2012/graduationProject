export default class CartPage {
  selectors = {
    cartItem: 'tbody tr',
    cartItemName: 'td.cart_description h4 a',
    cartItemPrice: 'td.cart_price p',
    cartItemQuantity: 'td.cart_quantity button',
    cartItemTotal: 'td.cart_total p.cart_total_price',
    cartProduct: 'td.cart_product'
  }

  async getCartItemInfo (cartItem) {
    const cartItemInfo = {}
    cartItemInfo.name = await cartItem.$eval(this.selectors.cartItemName, (element) => element.textContent)
    cartItemInfo.price = await cartItem.$eval(this.selectors.cartItemPrice, (element) => element.textContent)
    cartItemInfo.quantity = await cartItem.$eval(this.selectors.cartItemQuantity, (element) => element.textContent)
    cartItemInfo.total = await cartItem.$eval(this.selectors.cartItemTotal, (element) => element.textContent)
    return cartItemInfo
  }

  async verifyCartProducts ({ page }) {
    const cartItems = await page.$$(this.selectors.cartItem)
    const cartProductsInfo = []
    for (const cartItem of cartItems) {
      const cartItemInfo = await this.getCartItemInfo(cartItem)
      cartProductsInfo.push(cartItemInfo)
    }
    return cartProductsInfo
  }
}
