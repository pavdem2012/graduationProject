import { test, expect } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import BasePage from '../../framework/pages/BasePage.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import ProductsPage from '../../framework/pages/ProductsPage.js'

const setupTeardown = new SetupTeardown()
const basePage = new BasePage()
const productsPage = new ProductsPage()

test.describe('Search Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTeardown.setupNavTests({ page })
  })
  test.afterEach(async ({ page }) => {
    await setupTeardown.teardownTest({ page })
  })

  /**
     * Test Case 9: Search Product
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     * 4. Click on 'Products' button
     * 5. Verify user is navigated to ALL PRODUCTS page successfully
     * 6. Enter product name in search input and click search button
     * 7. Verify 'SEARCHED PRODUCTS' is visible
     * 8. Verify all the products related to search are visible
     * @type {string[]}
     */
  // Не стабильное решение для многопотока в разных браузерах. Очень мешает google vignette (вроде решено)
  const searchProducts = ['Winter Top', 'Men Tshirt', 'Blue Cotton Indie Mickey Dress', 'Sleeves Printed Top - White', 'Grunt Blue Slim Fit Jeans', 'Rust Red Linen Saree']
  for (const searchProduct of searchProducts) {
    test(`Test Search Product "${searchProduct}"`, async ({ page }) => {
      await page.click(basePage.selectors.productsBtn)
      await expect(page).toHaveURL(siteMap.pages.productsPage)
      await expect(page).toHaveTitle('Automation Exercise - All Products')
      await expect(page.locator(productsPage.selectors.productsList)).toBeVisible()
      await page.fill(productsPage.selectors.searchField, searchProduct)
      await page.waitForLoadState('domcontentloaded')
      await page.click(productsPage.selectors.searchBtn)
      await expect(page.locator(productsPage.selectors.productsList)).toBeVisible()
      await expect(page.locator(productsPage.selectors.productsList)).toContainText('Searched Products')
      const products = await page.$$(productsPage.selectors.productItem)
      for (const product of products) {
        const isVisible = await product.isVisible()
        expect(isVisible).toBe(true)
      }
      expect((await (await page.$(productsPage.selectors.miniCartProductName)).innerText()).trim()).toEqual(searchProduct)
    })
  }
  // тест для отладки механизма поиска
  // test('Search Product test', async ({ page }) => {
  //   await page.click(basePage.selectors.productsBtn)
  //   await expect(page).toHaveURL(siteMap.pages.productsPage)
  //   await expect(page).toHaveTitle('Automation Exercise - All Products')
  //   await expect(page.locator(productsPage.selectors.productsList)).toBeVisible()
  //   await page.fill(productsPage.selectors.searchField, 'Winter Top')
  //   await page.waitForLoadState('domcontentloaded')
  //   await page.click(productsPage.selectors.searchBtn)
  //   await expect(page.locator(productsPage.selectors.productsList)).toBeVisible()
  //   await expect(page.locator(productsPage.selectors.productsList)).toContainText('Searched Products')
  //   const products = await page.$$(productsPage.selectors.productItem)
  //   for (const product of products) {
  //     const isVisible = await product.isVisible()
  //     expect(isVisible).toBe(true)
  //   }
  //   expect((await (await page.$(productsPage.selectors.miniCartProductName)).innerText()).trim()).toEqual('Winter Top')
  // })
})
