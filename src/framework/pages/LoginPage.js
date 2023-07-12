export default class LoginPage {
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

  functions = {

    async fillSignUpForm (page,userData) {
      await page.fill(LoginPage.selectors.nameField, userData.firstName)
      await page.fill(LoginPage.selectors.emailField, userData.email)
      await page.waitForLoadState('domcontentloaded', {timeout: 30000})
      await page.click(LoginPage.selectors.signUpBtn)
      // await page.waitForLoadState('networkidle', {timeout: 30000})
    },

    async fillLoginInForm (page,userData) {
      await page.fill(LoginPage.selectors.emailLogField, userData.email)
      await page.fill(LoginPage.selectors.passLogField, userData.userPass)
      await page.waitForLoadState('domcontentloaded', {timeout: 30000})
      await page.click(LoginPage.selectors.loginBtn)
      await page.waitForLoadState('networkidle', {timeout: 30000})
    }
  }
}
