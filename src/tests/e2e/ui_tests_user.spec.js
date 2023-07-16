import { test, expect } from '@playwright/test'
import siteMap from '../../framework/config/siteMap.js'
import BasePage from '../../framework/pages/BasePage.js'
import LoginPage from '../../framework/pages/LoginPage.js'
import SignUpPage from '../../framework/pages/SignUpPage.js'
import UserCreator from '../../framework/fixture/UserCreator.js'
import SetupTeardown from '../../framework/config/setupTeardown.js'

const basePage = new BasePage()
const loginPage = new LoginPage()
const signUpPage = new SignUpPage()
const createUserDataSet = new UserCreator()
const setupTeardown = new SetupTeardown()
let userData

class TestSuite extends SetupTeardown {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }
}

test.describe.skip('User CRUD Tests', () => {
  test.beforeAll(async () => {
    userData = await createUserDataSet.createUserDataSet()
  })

  test.beforeEach(async ({ page }) => {
    await setupTeardown.setupLoginTests({ page })
  })

  test.afterEach(async ({ page }) => {
    await setupTeardown.teardownTest({ page })
  })
  /**
   * Test Case 1: Register User
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Signup / Login' button
   * 5. Verify 'New User Signup!' is visible
   * 6. Enter name and email address
   * 7. Click 'Signup' button
   * 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
   * 9. Fill details: Title, Name, Email, Password, Date of birth
   * 10. Select checkbox 'Sign up for our newsletter!'
   * 11. Select checkbox 'Receive special offers from our partners!'
   * 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
   * 13. Click 'Create Account button'
   * 14. Verify that 'ACCOUNT CREATED!' is visible
   * 15. Click 'Continue' button
   * 16. Verify that 'Logged in as username' is visible
   */
  test('should create user', async ({ page }) => {
    userData = await userData
    await expect(page).toHaveURL(siteMap.pages.loginPage)
    await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!')
    await loginPage.functions.fillSignUpForm(page, userData)
    await expect(page).toHaveURL(siteMap.pages.signUpPage)
    await expect(await page.textContent(SignUpPage.selectors.accInfoBlock)).toContain('Enter Account Information')
    const nameFieldValue = await page.$eval(SignUpPage.selectors.nameRegField, (el) => el.value)
    await expect(nameFieldValue).toContain(userData.firstName)
    const emailFieldValue = await page.$eval(SignUpPage.selectors.emailRegField, (el) => el.value)
    await expect(emailFieldValue).toContain(userData.email)
    await signUpPage.functions.fillAccForm(page, userData)
    await expect(await page.textContent(SignUpPage.selectors.accCreateHeader)).toContain('Account Created!')
    await page.click(SignUpPage.selectors.continueBtn)
    await expect(page).toHaveURL(siteMap.pages.basePage)
    await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`)
  })
  /**
   * Test Case 2: Login User with correct email and password
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Signup / Login' button
   * 5. Verify 'Login to your account' is visible
   * 6. Enter correct email address and password
   * 7. Click 'login' button
   * 8. Verify that 'Logged in as username' is visible
   * 9. Click 'Logout' button
   * 10. Verify that user is navigated to login page
   */
  test('should login/logout user', async ({ page }) => {
    userData = await userData
    await expect(page).toHaveURL(siteMap.pages.loginPage)
    await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account')
    await loginPage.functions.fillLoginInForm(page, userData)
    await expect(page).toHaveURL(siteMap.pages.basePage)
    await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`)
    await page.click(basePage.selectors.logoutBtn)
    await expect(page).toHaveURL(siteMap.pages.loginPage)
  })
  /**
   * Test Case 3: Login User with incorrect email and password
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Signup / Login' button
   * 5. Verify 'Login to your account' is visible
   * 6. Enter incorrect password
   * 7. Click 'login' button
   * 8. Verify error 'Your email or password is incorrect!' is visible
   */
  test('failed to login with wrong password', async ({ page }) => {
    userData = await userData
    await expect(page).toHaveURL(siteMap.pages.loginPage)
    await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account')
    await page.fill(LoginPage.selectors.emailLogField, userData.email)
    await page.fill(LoginPage.selectors.passLogField, 'wrongpassword')
    await page.click(LoginPage.selectors.loginBtn)
    const text = await page.textContent('p[style="color: red;"]')
    await expect(text).toContain('Your email or password is incorrect!')
    await expect(page).toHaveURL(siteMap.pages.loginPage)
  })
  /**
   * Test Case 4: Login User with incorrect email and password
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Signup / Login' button
   * 5. Verify 'Login to your account' is visible
   * 6. Enter incorrect email address
   * 7. Click 'login' button
   * 8. Verify error 'Your email or password is incorrect!' is visible
   */
  test('failed to login with wrong email', async ({ page }) => {
    userData = await userData
    await expect(page).toHaveURL(siteMap.pages.loginPage)
    await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account')
    await page.fill(LoginPage.selectors.emailLogField, 'wrongemail@example.com')
    await page.fill(LoginPage.selectors.passLogField, userData.userPass)
    await page.click(LoginPage.selectors.loginBtn)
    const text = await page.textContent('p[style="color: red;"]')
    await expect(text).toContain('Your email or password is incorrect!')
    await expect(page).toHaveURL(siteMap.pages.loginPage)
  })
  /**
   * Test Case 5: Register User with existing email
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Signup / Login' button
   * 5. Verify 'New User Signup!' is visible
   * 6. Enter name and already registered email address
   * 7. Click 'Signup' button
   * 8. Verify error 'Email Address already exist!' is visible
   */
  test('failed to register with existing email', async ({ page }) => {
    userData = await userData
    await expect(page).toHaveURL(siteMap.pages.loginPage)
    await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!')
    await loginPage.functions.fillSignUpForm(page, userData)
    const text = await page.textContent('p[style="color: red;"]')
    await expect(text).toContain('Email Address already exist!')
    await expect(page).toHaveURL(siteMap.pages.signUpPage)
  })
  /**
   * Test Case 6: Delete Account
   * 1. Launch browser
   * 2. Navigate to url 'http://automationexercise.com'
   * 3. Verify that home page is visible successfully
   * 4. Click on 'Signup / Login' button
   * 5. Verify 'Login to your account' is visible
   * 6. Enter correct email address and password
   * 7. Click 'login' button
   * 8. Verify that 'Logged in as username' is visible
   * 9. Click 'Delete Account' button
   * 10. Verify that 'ACCOUNT DELETED!' is visible  and click 'Continue' button
   */
  test('should login/delete user', async ({ page }) => {
    userData = await userData
    await expect(page).toHaveURL(siteMap.pages.loginPage)
    await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account')
    await page.fill(LoginPage.selectors.emailLogField, userData.email)
    await page.fill(LoginPage.selectors.passLogField, userData.userPass)
    await page.click(LoginPage.selectors.loginBtn)
    await expect(page).toHaveURL(siteMap.pages.basePage)
    await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`)
    await page.click(basePage.selectors.deleteAccBtn)
    await expect(page).toHaveURL(siteMap.pages.accDeletePage)
    await expect(await page.textContent(SignUpPage.selectors.accDeleteHeader)).toContain('Account Deleted!')
    await page.click(SignUpPage.selectors.continueBtn)
    await expect(page).toHaveURL(siteMap.pages.basePage)
  })
})

export default new TestSuite()
