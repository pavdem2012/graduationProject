import { expect, test } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import MainPage from '../../framework/pages/MainPage.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import ProductsPage from '../../framework/pages/ProductsPage.js'
import CartPage from '../../framework/pages/СartPage.js'
import ProductsDetailPage from '../../framework/pages/ProductsDetailPage.js'
import FooterBlock from '../../framework/elements/FooterBlock.js'
import HeaderBlock from '../../framework/elements/HeaderBlock.js'
import ProductsList from '../../framework/elements/ProductsList.js'

const setupTeardown = new SetupTeardown()
const mainPage = new MainPage()
const productsPage = new ProductsPage()
const cartPage = new CartPage()
const productsDetailPage = new ProductsDetailPage()
const footerBlock = new FooterBlock()
const headerBlock = new HeaderBlock()
const productsList = new ProductsList()

let cartItems
test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTeardown.setupNavTests({ page })
  })
  test.afterEach(async ({ page }) => {
    await setupTeardown.teardownTest({ page })
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
    await page.click(headerBlock.selectors.productsBtn)
    await expect(page).toHaveURL(siteMap.pages.productsPage)
    await expect(page).toHaveTitle('Automation Exercise - All Products')
    const addedProductsInfo = []
    const firstProduct = await productsList.clickAddToCart({ page }, 0)
    const firstProductInfo = await productsList.getProductInfo(firstProduct)
    addedProductsInfo.push(firstProductInfo)
    await productsList.clickContinueShopping({ page })
    const secondProduct = await productsList.clickAddToCart({ page }, 1)
    const secondProductInfo = await productsList.getProductInfo(secondProduct)
    addedProductsInfo.push(secondProductInfo)
    await productsList.clickContinueShopping({ page })
    await page.click(headerBlock.selectors.goToCartBtn)
    cartItems = await page.$$(cartPage.selectors.cartProduct)
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
    await page.click(headerBlock.selectors.productsBtn)
    await expect(page).toHaveURL(siteMap.pages.productsPage)
    await expect(page).toHaveTitle('Automation Exercise - All Products')
    await expect(page.locator(productsList.selectors.productsList)).toBeVisible()
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
    await productsList.clickContinueShopping({ page })
    await page.click(headerBlock.selectors.goToCartBtn)
    expect(await page.$eval(cartPage.selectors.cartItemQuantity, (element) => element.textContent)).toBe(value.toString())
  })
  /**
   *
   * Test Case 17: Remove Products From Cart
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Add products to cart
   * 5. Click 'Cart' button
   * 6. Verify that cart page is displayed
   * 7. Click 'X' button corresponding to particular product
   * 8. Verify that product is removed from the cart
   */
  test('Remove Products From Cart', async ({ page }) => {
    await productsList.clickAddToCart({ page }, 4)
    await productsList.clickContinueShopping({ page })
    await productsList.clickAddToCart({ page }, 3)
    await productsList.clickContinueShopping({ page })
    await page.click(headerBlock.selectors.goToCartBtn)
    await expect(page).toHaveURL(siteMap.pages.cartPage)
    await expect(page).toHaveTitle('Automation Exercise - Checkout')
    cartItems = await page.$$(cartPage.selectors.cartProduct)
    expect(cartItems.length).toBe(2)
    await cartPage.clickRemoveButtonAndWaitForLoad({ page })
    cartItems = await page.$$(cartPage.selectors.cartProduct)
    expect(cartItems.length).toBe(1)
    await cartPage.clickRemoveButtonAndWaitForLoad({ page })
    await (await page.$(cartPage.selectors.emptyCartElem)).isVisible()
    expect(await page.$eval(cartPage.selectors.emptyCartText, el => el.innerText)).toEqual('Cart is empty!')
  })
  /**
   * Test Case 22: Add to cart from Recommended items
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Scroll to bottom of page
   * 4. Verify 'RECOMMENDED ITEMS' are visible
   * 5. Click on 'Add To Cart' on Recommended product
   * 6. Click on 'View Cart' button
   * 7. Verify that product is displayed in cart page
   */
  test('Add to cart from Recommended items', async ({ page }) => {
    await page.hover(footerBlock.selectors.subscribeEmailField)
    await (await page.$(mainPage.selectors.recommendedItemsBlock)).isVisible()
    const addedProductsInfo = []
    const firstProduct = await mainPage.clickAddToCartRecommended({ page }, 1)
    const firstProductInfo = await productsList.getProductInfo(firstProduct)
    addedProductsInfo.push(firstProductInfo)
    await productsList.clickContinueShopping({ page })
    const secondProduct = await mainPage.clickAddToCartRecommended({ page }, 2)
    const secondProductInfo = await productsList.getProductInfo(secondProduct)
    addedProductsInfo.push(secondProductInfo)
    await productsList.clickContinueShopping({ page })
    await page.click(headerBlock.selectors.goToCartBtn)
    const cartProductsInfo1 = await cartPage.verifyCartProducts({ page })
    for (let i = 0; i < cartProductsInfo1.length; i++) {
      expect(cartProductsInfo1[i]).toEqual(addedProductsInfo[i])
    }
  })
})
