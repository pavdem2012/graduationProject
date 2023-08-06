import { test, expect } from '@playwright/test'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import ProductsPage from '../../framework/pages/ProductsPage.js'
import HeaderBlock from '../../framework/elements/HeaderBlock.js'
import ProductsList from '../../framework/elements/ProductsList.js'
import CartPage from '../../framework/pages/СartPage.js'
import LoginPage from '../../framework/pages/LoginPage.js'
import CheckoutPage from '../../framework/pages/CheckoutPage.js'
import PaymentPage from '../../framework/pages/PaymentPage.js'
import UserCRUDHooks from '../../framework/actions/UserCRUDHooks.js'

const setupTeardown = new SetupTeardown()
const productsPage = new ProductsPage()
const headerBlock = new HeaderBlock()
const productsList = new ProductsList()
const cartPage = new CartPage()
const loginPage = new LoginPage()
const checkoutPage = new CheckoutPage()
const paymentPage = new PaymentPage()
const userCRUDHooks = new UserCRUDHooks()

let userData

test.describe('Order Tests', () => {
  test.beforeEach(async ({ page }) => {
    userData = await userCRUDHooks.userSetHook(userData)
    await setupTeardown.setupNavTests({ page })
  })
  test.afterEach(async ({ page }) => {
    userData = await userCRUDHooks.userDeleteHook(userData)
    await setupTeardown.teardownTest({ page })
  })
  /**
   * Test Case 16: Place Order: Login before Checkout
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click 'Signup / Login' button
   * 5. Fill email, password and click 'Login' button
   * 6. Verify 'Logged in as username' at top
   * 7. Add products to cart
   * 8. Click 'Cart' button
   * 9. Verify that cart page is displayed
   * 10. Click Proceed To Checkout
   * 11. Verify Address Details and Review Your Order
   * 12. Enter description in comment text area and click 'Place Order'
   * 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
   * 14. Click 'Pay and Confirm Order' button
   * 15. Verify success message 'Order Placed!' & 'Congratulations! Your order has been confirmed!'
   * 16. Click 'Download Invoice' button and verify invoice is downloaded successfully.
   * 17. Click 'Continue' button
   */
  test('Verify Place Order: Login before Checkout', async ({ page }) => {
    await page.click(headerBlock.selectors.signUpBtn)
    await loginPage.fillLoginInForm(page, userData)
    await expect(await page.textContent(headerBlock.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`)
    await productsList.clickAddToCart({ page }, 4)
    await productsList.clickContinueShopping({ page })
    await page.click(headerBlock.selectors.goToCartBtn)
    await expect(page).toHaveTitle('Automation Exercise - Checkout')
    await page.click(cartPage.selectors.procCheckoutBtn)
    await expect(await page.textContent(checkoutPage.selectors.checkoutInfoBlock)).toContain(userData.firstName)
    await page.fill(checkoutPage.selectors.orderMsgField, 'Тестовый заказ в рамках Дипломного проекта')
    await page.click(checkoutPage.selectors.placeOrderBtn)
    await paymentPage.fillCartData({ page })
    await page.click(paymentPage.selectors.confirmOrderBtn)
    await expect(page.locator(paymentPage.selectors.orderPlHeader)).toContainText('Order Placed!')
    await expect(page.locator(paymentPage.selectors.orderConText)).toContainText('Congratulations! Your order has been confirmed!')
    const download = await Promise.all([
      page.waitForEvent('download'),
      page.click(checkoutPage.selectors.placeOrderBtn)
    ])
    await expect(download[0].suggestedFilename()).toBe('invoice.txt')
    await page.click('a.btn-primary')
  })
  /**
     * Test Case 20: Search Products and Verify Cart After Login
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Click on 'Products' button
     * 4. Verify user is navigated to ALL PRODUCTS page successfully
     * 5. Enter product name in search input and click search button
     * 6. Verify 'SEARCHED PRODUCTS' is visible
     * 7. Verify all the products related to search are visible
     * 8. Add those products to cart
     * 9. Click 'Cart' button and verify that products are visible in cart
     * 10. Click 'Signup / Login' button and submit login details
     * 11. Again, go to Cart page
     * 12. Verify that those products are visible in cart after login as well
     */
  test('Search Products and Verify Cart After Login', async ({ page }) => {
    await page.click(headerBlock.selectors.productsBtn)
    await expect(productsPage.verifyProductPage({ page })).resolves.toBe(true)
    await page.fill(productsPage.selectors.searchField, 'Winter Top')
    await page.click(productsPage.selectors.searchBtn)
    await productsPage.verifySearchedProductsVisible(page)
    expect((await (await page.$(productsList.selectors.miniCartProductName)).innerText()).trim()).toEqual('Winter Top')
    const addedProductsInfo = []
    const product = await productsList.clickAddToCart({ page }, 0)
    const productInfo = await productsList.getProductInfo(product)
    addedProductsInfo.push(productInfo)
    await productsList.clickContinueShopping({ page })
    await page.click(headerBlock.selectors.goToCartBtn)
    await cartPage.verifyProductsInCart({ page, addedProductsInfo })
    await page.click(headerBlock.selectors.signUpBtn)
    await loginPage.fillLoginInForm(page, userData)
    await page.click(headerBlock.selectors.goToCartBtn)
    await cartPage.verifyProductsInCart({ page, addedProductsInfo })
  })
})
