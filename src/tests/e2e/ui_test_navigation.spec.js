import { test, expect } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import MainPage from '../../framework/pages/MainPage.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import ContactUsPage from '../../framework/pages/ContactUsPage.js'
import ProductsDetailPage from '../../framework/pages/ProductsDetailPage.js'
import ProductsPage from '../../framework/pages/ProductsPage.js'
import LeftMenu from '../../framework/elements/LeftMenu.js'
import FooterBlock from '../../framework/elements/FooterBlock.js'
import HeaderBlock from '../../framework/elements/HeaderBlock.js'
import ProductsList from '../../framework/elements/ProductsList.js'

const setupTeardown = new SetupTeardown()
const mainPage = new MainPage()
const contactUsPage = new ContactUsPage()
const productsDetailPage = new ProductsDetailPage()
const productsPage = new ProductsPage()
const leftMenu = new LeftMenu()
const footerBlock = new FooterBlock()
const headerBlock = new HeaderBlock()
const productsBlock = new ProductsList()

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
    await page.click(headerBlock.selectors.contactUsBtn)
    await expect(page).toHaveURL(siteMap.pages.contactUsPage)
    await expect(page.locator(contactUsPage.selectors.contactUsFormHeader)).toHaveText('Get In Touch')
    await contactUsPage.fillContactUsForm({ page })
    // await page.fill(contactUsPage.selectors.contactUsFormName, 'user')
    // await page.fill(contactUsPage.selectors.contactUsFormEmail, 'example@example.example')
    // await page.fill(contactUsPage.selectors.contactUsFormSubject, 'error')
    // await page.fill(contactUsPage.selectors.contactUsFormMessage, 'A small error has occurred')
    // fs.writeFileSync('test_file.txt', 'This is a test file for uploading.')
    // const handle = await page.$(contactUsPage.selectors.contactUsFormUploadBtn)
    // await handle.setInputFiles('./test_file.txt')
    // await page.waitForLoadState('domcontentloaded', { timeout: 10000 })
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
    await page.click(headerBlock.selectors.testCasesBtn)
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
    await page.click(headerBlock.selectors.productsBtn)
    await expect(page).toHaveURL(siteMap.pages.productsPage)
    await expect(page).toHaveTitle('Automation Exercise - All Products')
    await expect(page.locator(productsBlock.selectors.productsList)).toBeVisible()
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
   * Test Case 18: View Category Products
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that categories are visible on left sidebar
   * 4. Click on 'Women' category
   * 5. Click on any category link under 'Women' category, for example: Dress
   * 6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
   * 7. On left sidebar, click on any sub-category link of 'Men' category
   * 8. Verify that user is navigated to that category page
   */
  test('Verify View Category Products', async ({ page }) => {
    await expect(page.locator(leftMenu.selectors.sideBarBlock)).toBeVisible()
    await expect(page.locator(leftMenu.selectors.sideBarBlock)).toContainText('Category')
    await page.click(leftMenu.selectors.sideBarWomen.sideBarWomenItem)
    await expect(page.locator(leftMenu.selectors.sideBarWomen.sideBarWomenItems)).toBeVisible()
    await page.waitForLoadState('domcontentloaded')
    await page.click(leftMenu.selectors.sideBarWomen.sideBarWomenDress)
    await expect(page.url()).toContain(siteMap.pages.productCategoryPage)
    await expect(page.locator(productsBlock.selectors.productsList)).toBeVisible()
    await expect(page.locator(productsBlock.selectors.productsListHeader)).toContainText('Women - Dress Products')
    await page.click(leftMenu.selectors.sideBarMen.sideBarMenItem)
    await expect(page.locator(leftMenu.selectors.sideBarMen.sideBarMenItems)).toBeVisible()
    await page.click(leftMenu.selectors.sideBarMen.sideBarMenTShirts)
    await expect(page.url()).toContain(siteMap.pages.productCategoryPage)
    await expect(page.locator(productsBlock.selectors.productsList)).toBeVisible()
    await expect(page.locator(productsBlock.selectors.productsListHeader)).toContainText('Men - Tshirts Products')
  })
  /**
   * Test Case 19: View & Cart Brand Products
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Click on 'Products' button
   * 4. Verify that Brands are visible on left sidebar
   * 5. Click on any brand name
   * 6. Verify that user is navigated to brand page and brand products are displayed
   * 7. On left sidebar, click on any other brand link
   * 8. Verify that user is navigated to that brand page and can see products
   */
  test('Verify View & Cart Brand Products', async ({ page }) => {
    await page.click(headerBlock.selectors.productsBtn)
    await expect(page.locator(leftMenu.selectors.sideBarBrandsBlock)).toBeVisible()
    await expect(page.locator(leftMenu.selectors.sideBarBrandsHeader)).toContainText('Brands')
    await page.click(leftMenu.selectors.sideBarBrandsNames.poloBrand)
    await expect(page.url()).toContain(siteMap.pages.brandsProductPage)
    await expect(page.locator(productsBlock.selectors.productsList)).toBeVisible()
    await expect(page.locator(productsBlock.selectors.productsListHeader)).toContainText('Brand - Polo Products')
    await page.click(leftMenu.selectors.sideBarBrandsNames.madameBrand)
    await expect(page.url()).toContain(siteMap.pages.brandsProductPage)
    await expect(page.locator(productsBlock.selectors.productsList)).toBeVisible()
    await expect(page.locator(productsBlock.selectors.productsListHeader)).toContainText('Brand - Madame Products')
  })
  /**
   * Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Scroll down page to bottom
   * 5. Verify 'SUBSCRIPTION' is visible
   * 6. Click on arrow at bottom right side to move upward
   * 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
   */
  test('Verify Scroll Up using \'Arrow\' button and Scroll Down functionality', async ({ page }) => {
    await page.keyboard.down('End')
    await expect(page.locator(footerBlock.selectors.subscribeHeader)).toContainText('Subscription')
    await expect(page.locator(footerBlock.selectors.subscribeHeader)).toBeVisible()
    await page.dblclick(mainPage.selectors.scrollUpBtn, { force: true })
    await expect(page.locator(mainPage.selectors.activeSliderHeader)).toBeVisible()
    await expect(page.locator(mainPage.selectors.activeSliderHeader)).toContainText('Full-Fledged practice website for Automation Engineers')
  })
  /**
   * Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Scroll down page to bottom
   * 5. Verify 'SUBSCRIPTION' is visible
   * 6. Scroll up page to top
   * 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
   */
  test('Verify Scroll Up without \'Arrow\' button and Scroll Down functionality', async ({ page }) => {
    await page.hover(footerBlock.selectors.footerElem)
    await expect(page.locator(footerBlock.selectors.subscribeHeader)).toContainText('Subscription')
    await expect(page.locator(footerBlock.selectors.subscribeHeader)).toBeVisible()
    await page.hover(headerBlock.selectors.headerElem)
    await expect(page.locator(mainPage.selectors.activeSliderHeader)).toBeVisible()
    await expect(page.locator(mainPage.selectors.activeSliderHeader)).toContainText('Full-Fledged practice website for Automation Engineers')
  })
})
