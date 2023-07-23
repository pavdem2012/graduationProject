export default class basePage {
  selectors = {
    signUpBtn: 'i[class="fa fa-lock"]',
    loggedBy: 'div.shop-menu li:last-child',
    logoutBtn: 'a[href="/logout"]',
    deleteAccBtn: 'a[href="/delete_account"]',
    contactUsBtn: 'a[href="/contact_us"]',
    testCasesBtn: 'a[href="/test_cases"]',
    productsBtn: 'a[href="/products"]',
    viewCartBtn: 'a[href="/view_cart"]',
    subscribeHeader: 'div.single-widget > h2',
    subscribeEmailField: '#susbscribe_email',
    subscribeEmailBtn: 'button.btn-default',
    alertSuccessMsg: 'div.alert-success',
    addToCartButton: '.add-to-cart',
    continueShoppingBtn: 'button.btn-block',
    productItem: 'div.features_items>div>div.product-image-wrapper',
    recommendedItemsBlock: 'div.recommended_items',
    recommendedItemsActive: 'div.active>div>div.product-image-wrapper',
    sideBarBlock: 'div.left-sidebar',
    sideBarWomen: {
      sideBarWomenItem: '#accordian > div:nth-child(1) > div.panel-heading > h4 > a > span > i',
      sideBarWomenItems: 'div[id=Women]',
      sideBarWomenDress: 'a[href="/category_products/1"]'
    },
    sideBarMen: {
      sideBarMenItem: '#accordian > div:nth-child(2) > div.panel-heading > h4 > a',
      sideBarMenItems: 'div[id=Men]',
      sideBarMenTShirts: 'a[href="/category_products/3"]'
    },
    footerElem: '#footer',
    headerElem: '#header',
    scrollUpBtn: '#scrollUp>i',
    activeSliderHeader: '#slider-carousel > div > div.active > div:nth-child(1) > h2'
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

  async clickAddToCartRecommended ({ page }, productIndex) {
    const product = (await page.$$(this.selectors.recommendedItemsActive))[productIndex]
    await product.hover()
    await (await product.$(this.selectors.addToCartButton)).click()
    return product
  }
}
