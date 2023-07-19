export default class productsPage {
  selectors = {
    productsList: 'div.features_items',
    viewProduct1Btn: 'a[href="/product_details/1"]',
    searchField: 'input[name="search"]',
    searchBtn: 'button.btn-lg',
    productItem: 'div.product-image-wrapper',
    productImageWrapper: '.product-image-wrapper',
    addToCartButton: '.add-to-cart',
    continueShoppingBtn: 'button.btn-success',
    goToCartBtn: 'ul.nav>li>a>i.fa-shopping-cart'
  }

  async clickAddToCart ({ page }, productIndex) {
    const product = (await page.$$(this.selectors.productImageWrapper))[productIndex]
    await product.hover({ timeout: 1000 })
    await (await product.$(this.selectors.addToCartButton)).click()
    return product
  }

  async clickContinueShopping ({ page }) {
    await page.click(this.selectors.continueShoppingBtn)
  }

  async getProductInfo (productElement) {
    const productInfo = {}
    productInfo.quantity = '1'
    productInfo.total = await productElement.$eval('div.productinfo h2', (element) => element.textContent)
    productInfo.price = await productElement.$eval('div.productinfo h2', (element) => element.textContent)
    productInfo.name = await productElement.$eval('div.productinfo p', (element) => element.textContent)
    return productInfo
  }
}
