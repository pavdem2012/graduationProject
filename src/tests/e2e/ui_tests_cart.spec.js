import { expect, test } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import BasePage from '../../framework/pages/BasePage.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import ProductsPage from '../../framework/pages/ProductsPage.js'
import CartPage from '../../framework/pages/СartPage.js'
import ProductsDetailPage from '../../framework/pages/ProductsDetailPage.js'

const setupTeardown = new SetupTeardown()
const basePage = new BasePage()
const productsPage = new ProductsPage()
const cartPage = new CartPage()
const productsDetailPage = new ProductsDetailPage()

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTeardown.setupNavTests({ page })
  })
  test.afterEach(async ({ page }) => {
    await setupTeardown.teardownTest({ page })
  })
  /**
   * Test Case 11: Verify Subscription in Cart page
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click 'Cart' button
   * 5. Scroll down to footer
   * 6. Verify text 'SUBSCRIPTION'
   * 7. Enter email address in input and click arrow button
   * 8. Verify success message 'You have been successfully subscribed!' is visible
   */
  test('Verify Subscription in Cart page', async ({ page }) => {
    await page.click(basePage.selectors.viewCartBtn)
    await expect(page).toHaveURL(siteMap.pages.cartPage)
    await expect(page).toHaveTitle('Automation Exercise - Checkout')
    await page.hover(basePage.selectors.susbscribeEmailField)
    await expect(page.locator(basePage.selectors.susbscribeHeader)).toContainText('Subscription')
    await page.fill(basePage.selectors.susbscribeEmailField, 'example@example.example')
    await page.click(basePage.selectors.susbscribeEmailBtn)
    await expect(page.locator(basePage.selectors.alertSuccessMsg)).toContainText('You have been successfully subscribed!')
    await expect(page.locator(basePage.selectors.alertSuccessMsg)).toBeVisible()
  })
  /**
     * Test Case 12: Add Products in Cart
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     * 4. Click 'Products' button
     * 5. Hover over first product and click 'Add to cart'
     * 6. Click 'Continue Shopping' button
     * 7. Hover over second product and click 'Add to cart'
     * 8. Click 'View Cart' button
     * 9. Verify both products are added to Cart
     * 10. Verify their prices, quantity and total price
     */
  test('Verify Add Products in Cart', async ({ page }) => {
    await page.click(basePage.selectors.productsBtn)
    await expect(page).toHaveURL(siteMap.pages.productsPage)
    await expect(page).toHaveTitle('Automation Exercise - All Products')
    const addedProductsInfo = []
    const firstProduct = await productsPage.clickAddToCart({ page }, 0)
    const firstProductInfo = await productsPage.getProductInfo(firstProduct)
    addedProductsInfo.push(firstProductInfo)
    await productsPage.clickContinueShopping({ page })
    const secondProduct = await productsPage.clickAddToCart({ page }, 1)
    const secondProductInfo = await productsPage.getProductInfo(secondProduct)
    addedProductsInfo.push(secondProductInfo)
    await productsPage.clickContinueShopping({ page })
    await page.click(productsPage.selectors.goToCartBtn)
    const cartItems = await page.$$(cartPage.selectors.cartProduct)
    expect(cartItems.length).toBe(2)
    const cartProductsInfo1 = await cartPage.verifyCartProducts({ page })
    for (let i = 0; i < cartProductsInfo1.length; i++) {
      expect(cartProductsInfo1[i]).toEqual(addedProductsInfo[i])
    }
  })
  /**
   * Test Case 13: Verify Product quantity in Cart
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click 'View Product' for any product on home page
   * 5. Verify product detail is opened
   * 6. Increase quantity to 4
   * 7. Click 'Add to cart' button
   * 8. Click 'View Cart' button
   * 9. Verify that product is displayed in cart page with exact quantity
   */
  test('Verify Product quantity in Cart', async ({ page }) => {
    const value = 4
    await page.click(basePage.selectors.productsBtn)
    await expect(page).toHaveURL(siteMap.pages.productsPage)
    await expect(page).toHaveTitle('Automation Exercise - All Products')
    await expect(page.locator(productsPage.selectors.productsList)).toBeVisible()
    await page.click(productsPage.selectors.viewProduct1Btn)
    await expect(page).toHaveURL(siteMap.pages.product1DetailsPage)
    await expect(page).toHaveTitle('Automation Exercise - Product Details')
    await expect(page.locator(productsDetailPage.selectors.productName)).toBeVisible()
    await expect(page.locator(productsDetailPage.selectors.category)).toBeVisible()
    await expect(page.locator(productsDetailPage.selectors.price)).toBeVisible()
    await expect(page.locator(productsDetailPage.selectors.availability)).toBeVisible()
    await expect(page.locator(productsDetailPage.selectors.condition)).toBeVisible()
    await expect(page.locator(productsDetailPage.selectors.brand)).toBeVisible()
    await productsDetailPage.setInputValue({ page }, value)
    await page.click(productsDetailPage.selectors.addToCartBtn)
    await productsPage.clickContinueShopping({ page })
    await page.click(productsPage.selectors.goToCartBtn)
    expect(await page.$eval(cartPage.selectors.cartItemQuantity, (element) => element.textContent)).toBe(value.toString())
  })
})
