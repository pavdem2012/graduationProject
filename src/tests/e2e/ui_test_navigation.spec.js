import { test, expect } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import BasePage from '../../framework/pages/BasePage.js'
// import LoginPage from '../../framework/pages/LoginPage.js'
// import SignUpPage from '../../framework/pages/SignUpPage.js'
// import UserCreator from '../../framework/fixture/UserCreator.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'
import ContactUsPage from '../../framework/pages/ContactUsPage.js'
import fs from 'fs'
// import * as path from 'path'

const basePage = new BasePage()
const contactUsPage = new ContactUsPage()
// const loginPage = new LoginPage()
// const signUpPage = new SignUpPage()
// const createUserDataSet = new UserCreator()
const setupTeardown = new SetupTeardown()
// let userData

// class TestSuite extends SetupTeardown {
//   // eslint-disable-next-line no-useless-constructor
//   constructor () {
//     super()
//   }
// }

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
    let handle = await page.$(contactUsPage.selectors.contactUsFormUploadBtn)
    await handle.setInputFiles('./test_file.txt')
    handle = await page.$(contactUsPage.selectors.contactUsFormSubmitBtn)
    await handle.click()
    // await page.evaluate(() => {
    //   const submitButton = document.querySelector('.submit_form')
    //   submitButton.click()
    // })
    // await page.waitForTimeout(10000)
    // await page.keyboard.press('Enter')
    // await page.click(contactUsPage.selectors.contactUsFormSubmitBtn)
    // page.on('dialog', async dialog => {
    //   // Verify type of dialog
    //   expect(dialog.type()).toContain('confirm')
    //   // Verify Dialog Message
    //   expect(dialog.message()).toContain('Press OK to proceed!')
    //   // Click on OK Button
    //   await dialog.accept()
    // })
    // await expect(page.locator(contactUsPage.selectors.contactUsFormSuccessMsg)).toHaveText('Success! Your details have been submitted successfully.')
  })
})
