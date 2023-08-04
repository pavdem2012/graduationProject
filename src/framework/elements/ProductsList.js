export default class ProductsList {
  selectors = {
    productsList: 'div.features_items',
    productsListHeader: 'div.features_items>h2',
    addToCartButton: '.add-to-cart',
    productItem: 'div.features_items>div>div.product-image-wrapper',
    miniCartProductName: 'div.productinfo p',
    miniCartProductPrice: 'div.productinfo h2',
    continueShoppingBtn: 'button.btn-block'
  }

  async clickAddToCart ({ page }, productIndex) {
    const product = (await page.$$(this.selectors.productItem))[productIndex]
    await product.hover()
    await (await product.$(this.selectors.addToCartButton)).click()
    return product
  }

  async clickContinueShopping ({ page }) {
    await page.click(this.selectors.continueShoppingBtn)
  }

  async getProductInfo (productElement) {
    const productInfo = {}
    productInfo.quantity = '1'
    productInfo.total = await productElement.$eval(this.selectors.miniCartProductPrice, (element) => element.textContent)
    productInfo.price = await productElement.$eval(this.selectors.miniCartProductPrice, (element) => element.textContent)
    productInfo.name = await productElement.$eval(this.selectors.miniCartProductName, (element) => element.textContent)
    return productInfo
  }
}
