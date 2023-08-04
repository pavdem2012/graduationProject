import ProductsList from '../elements/ProductsList.js'

const productsBlock = new ProductsList()
export default class mainPage {
  selectors = {
    alertSuccessMsg: 'div.alert-success',
    recommendedItemsBlock: 'div.recommended_items',
    recommendedItemsActive: 'div.active>div>div.product-image-wrapper',
    scrollUpBtn: '#scrollUp>i',
    activeSliderHeader: '#slider-carousel > div > div.active > div:nth-child(1) > h2'
  }

  async clickAddToCartRecommended ({ page }, productIndex) {
    const product = (await page.$$(this.selectors.recommendedItemsActive))[productIndex]
    await product.hover()
    await (await product.$(productsBlock.selectors.addToCartButton)).click()
    return product
  }
}
