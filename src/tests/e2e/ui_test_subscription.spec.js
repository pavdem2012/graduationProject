import { expect, test } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import MainPage from '../../framework/pages/MainPage.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import FooterBlock from '../../framework/elements/FooterBlock.js'
import HeaderBlock from '../../framework/elements/HeaderBlock.js'

const setupTeardown = new SetupTeardown()
const mainPage = new MainPage()
const footerBlock = new FooterBlock()
const headerBlock = new HeaderBlock()

test.describe('Subscription Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTeardown.setupNavTests({ page })
  })
  test.afterEach(async ({ page }) => {
    await setupTeardown.teardownTest({ page })
  })
  /**
     * Test Case 10: Verify Subscription in home page
     * 1. Launch browser
     * 2. Navigate to url 'http://automationexercise.com'
     * 3. Verify that home page is visible successfully
     * 4. Scroll down to footer
     * 5. Verify text 'SUBSCRIPTION'
     * 6. Enter email address in input and click arrow button
     * 7. Verify success message 'You have been successfully subscribed!' is visible
     */
  test('Verify Subscription in home page', async ({ page }) => {
    await page.hover(footerBlock.selectors.subscribeEmailField)
    await expect(page.locator(footerBlock.selectors.subscribeHeader)).toContainText('Subscription')
    await page.fill(footerBlock.selectors.subscribeEmailField, 'example@example.example')
    await page.click(footerBlock.selectors.subscribeEmailBtn)
    await expect(page.locator(mainPage.selectors.alertSuccessMsg)).toContainText('You have been successfully subscribed!')
    await expect(page.locator(mainPage.selectors.alertSuccessMsg)).toBeVisible()
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
    await page.click(headerBlock.selectors.goToCartBtn)
    await expect(page).toHaveURL(siteMap.pages.cartPage)
    await expect(page).toHaveTitle('Automation Exercise - Checkout')
    await page.hover(footerBlock.selectors.footerElem)
    await expect(page.locator(footerBlock.selectors.subscribeHeader)).toContainText('Subscription')
    await page.fill(footerBlock.selectors.subscribeEmailField, 'example@example.com')
    await page.click(footerBlock.selectors.subscribeEmailBtn)
    await expect(page.locator(mainPage.selectors.alertSuccessMsg)).toContainText('You have been successfully subscribed!')
    await expect(page.locator(mainPage.selectors.alertSuccessMsg)).toBeVisible()
  })
})
