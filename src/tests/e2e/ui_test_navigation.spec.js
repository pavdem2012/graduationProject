import { test, expect } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import BasePage from '../../framework/pages/BasePage.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import ContactUsPage from '../../framework/pages/ContactUsPage.js'
import ProductsDetailPage from '../../framework/pages/ProductsDetailPage.js'
import ProductsPage from '../../framework/pages/ProductsPage.js'
import fs from 'fs'
test.use({ javaScriptEnabled: false })

const setupTeardown = new SetupTeardown()
const basePage = new BasePage()
const contactUsPage = new ContactUsPage()
const productsDetailPage = new ProductsDetailPage()
const productsPage = new ProductsPage()

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupTeardown.setupNavTests({ page })
  })
  test.afterEach(async ({ page }) => {
    await setupTeardown.teardownTest({ page })
  })
  /**
   * Test Case 6: Contact Us Form
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Contact Us' button
   * 5. Verify 'GET IN TOUCH' is visible
   * 6. Enter name, email, subject and message
   * 7. Upload file
   * 8. Click 'Submit' button
   * 9. Click OK button
   * 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
   * 11. Click 'Home' button and verify that landed to home page successfully
   */
  test('Contact Us form validation', async ({ page }) => {
    await page.click(basePage.selectors.contactUsBtn)
    await expect(page).toHaveURL(siteMap.pages.contactUsPage)
    await expect(page.locator(contactUsPage.selectors.contactUsFormHeader)).toHaveText('Get In Touch')
    await page.fill(contactUsPage.selectors.contactUsFormName, 'user')
    await page.fill(contactUsPage.selectors.contactUsFormEmail, 'example@example.example')
    await page.fill(contactUsPage.selectors.contactUsFormSubject, 'error')
    await page.fill(contactUsPage.selectors.contactUsFormMessage, 'A small error has occurred')
    fs.writeFileSync('test_file.txt', 'This is a test file for uploading.')
    const handle = await page.$(contactUsPage.selectors.contactUsFormUploadBtn)
    await handle.setInputFiles('./test_file.txt')
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 })
    page.on('dialog', dialog => dialog.accept())
    await page.click(contactUsPage.selectors.contactUsFormSubmitBtn)
    await expect(page.locator(contactUsPage.selectors.contactUsFormSuccessMsg)).toHaveText('Success! Your details have been submitted successfully.')
  })
  /**
   * Test Case 7: Verify Test Cases Page
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Test Cases' button
   * 5. Verify user is navigated to test cases page successfully
   */
  test('Verify Test Cases Page Navigation', async ({ page }) => {
    await page.click(basePage.selectors.testCasesBtn)
    console.log(page.url())
    await expect(page).toHaveURL(siteMap.pages.testCasesPage)
    await expect(page).toHaveTitle('Automation Practice Website for UI Testing - Test Cases')
  })
  /**
   * Test Case 8: Verify All Products and product detail page
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Products' button
   * 5. Verify user is navigated to ALL PRODUCTS page successfully
   * 6. The products list is visible
   * 7. Click on 'View Product' of first product
   * 8. User is landed to product detail page
   * 9. Verify that detail. Detail is visible: product name, category, price, availability, condition, brand
   */
  test('Verify All Products and product detail page', async ({ page }) => {
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
  // Не стабильное решение для многопотока в разных браузерах. Очень мешает google vignette
  const searchProducts = ['Winter Top', 'Blue Cotton Indie Mickey Dress', 'Grunt Blue Slim Fit Jeans']
  for (const searchProduct of searchProducts) {
    test(`Test Search Product "${searchProduct}"`, async ({ page }) => {
      await page.click(basePage.selectors.productsBtn)
      console.log(page.url())
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
    })
  }
  test('Search Product test', async ({ page }) => {
    console.log(page.url())
    await page.click(basePage.selectors.productsBtn)
    await expect(page).toHaveURL(siteMap.pages.productsPage)
    await expect(page).toHaveTitle('Automation Exercise - All Products')
    await expect(page.locator(productsPage.selectors.productsList)).toBeVisible()
    await page.fill(productsPage.selectors.searchField, 'Winter Top')
    await page.waitForLoadState('domcontentloaded')
    await page.click(productsPage.selectors.searchBtn)
    await expect(page.locator(productsPage.selectors.productsList)).toBeVisible()
    await expect(page.locator(productsPage.selectors.productsList)).toContainText('Searched Products')
    const products = await page.$$(productsPage.selectors.productItem)
    for (const product of products) {
      const isVisible = await product.isVisible()
      expect(isVisible).toBe(true)
    }
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
    await page.hover(basePage.selectors.susbscribeEmailField)
    await expect(page.locator(basePage.selectors.susbscribeHeader)).toContainText('Subscription')
    await page.fill(basePage.selectors.susbscribeEmailField, 'example@example.example')
    await page.click(basePage.selectors.susbscribeEmailBtn)
    await expect(page.locator(basePage.selectors.alertSuccessMsg)).toContainText('You have been successfully subscribed!')
    await expect(page.locator(basePage.selectors.alertSuccessMsg)).toBeVisible()
  })
})
