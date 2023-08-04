export default class loginPage {
  static selectors = {
    signUpForm: 'div[class="signup-form"]',
    nameField: 'input[data-qa="signup-name"]',
    emailField: 'input[data-qa="signup-email"]',
    signUpBtn: 'button[data-qa="signup-button"]',
    loginForm: 'div[class="login-form"]',
    emailLogField: 'input[data-qa="login-email"]',
    passLogField: 'input[data-qa="login-password"]',
    loginBtn: 'button[data-qa="login-button"]'
  }

  async fillSignUpForm (page, userData) {
    await page.fill(loginPage.selectors.nameField, userData.firstName)
    await page.fill(loginPage.selectors.emailField, userData.email)
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 })
    await page.click(loginPage.selectors.signUpBtn)
  }

  async fillLoginInForm (page, userData) {
    await page.fill(loginPage.selectors.emailLogField, userData.email)
    await page.fill(loginPage.selectors.passLogField, userData.userPass)
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 })
    await page.click(loginPage.selectors.loginBtn)
  }
}
