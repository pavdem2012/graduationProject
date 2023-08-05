import { expect } from '@playwright/test'
import siteMap from '../config/siteMap.js'
import ProductsList from '../../framework/elements/ProductsList.js'

const productsList = new ProductsList()
export default class productsPage {
  selectors = {
    viewProduct1Btn: 'a[href="/product_details/1"]',
    searchField: 'input[name="search"]',
    searchBtn: 'button.btn-lg'
  }

  async verifyProductPage ({ page }) {
    try {
      await expect(page).toHaveURL(siteMap.pages.productsPage)
      await expect(page).toHaveTitle('Automation Exercise - All Products')
      await expect(page.locator(productsList.selectors.productsList)).toBeVisible()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async verifySearchedProductsVisible (page) {
    await expect(page.locator(productsList.selectors.productsList)).toContainText('Searched Products')
    const products = await page.$$(productsList.selectors.productItem)
    for (const product of products) {
      const isVisible = await product.isVisible()
      expect(isVisible).toBe(true)
    }
  }

  // async addProductToCartAndGetInfo (page, productIndex) {
  //   await this.verifySearchedProductsVisible(page)
  //   const product = await productsList.clickAddToCart({ page }, productIndex)
  //   await page.waitForLoadState('domcontentloaded')
  //   const productInfo = await productsList.getProductInfo(product)
  //   // await productsList.clickContinueShopping(page)
  //   return productInfo
  // }
}
