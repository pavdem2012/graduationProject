// import siteMap from '../../framework/config/siteMap.js'
// import LoginPage from '../../framework/pages/LoginPage.js'
// import { test, expect } from '@playwright/test'
// import BasePage from '../../framework/pages/BasePage.js'
// import SignUpPage from '../../framework/pages/SignUpPage.js'
// import UserCreator from '../../framework/fixture/UserCreator.js'
//
// const basePage = new BasePage()
// const loginPage = new LoginPage()
// const signUpPage = new SignUpPage()
// const createUserDataSet = new UserCreator()
// const userDataSetMap = new Map()
//
// const uniqueKeyPrefixes = new Map()
//
// function generateUniqueKeyPrefix (browserName) {
//   if (!uniqueKeyPrefixes.has(browserName)) {
//     uniqueKeyPrefixes.set(browserName, generateUniqueId())
//   }
//   return uniqueKeyPrefixes.get(browserName)
// }
//
// function generateUniqueId () {
//   // Генерация уникального идентификатора текущая дата и время
//   return Date.now().toString()
// }
//
// test.describe('login/logout tests', () => {
//   test.beforeEach(async ({ page, browserName }) => {
//     let userDataSet
//     if (userDataSetMap.has(browserName)) {
//       userDataSet = userDataSetMap.get(browserName)
//     } else {
//       const uniqueKeyPrefix = generateUniqueKeyPrefix(browserName)
//       userDataSet = await createUserDataSet.createUserDataSet(uniqueKeyPrefix)
//       userDataSetMap.set(browserName, userDataSet)
//     }
//     if (!page.context.userData) {
//       page.context.userData = {}
//     }
//     page.context.userData[browserName] = userDataSet
//     await page.goto(siteMap.pages.basePage)
//     await page.waitForLoadState('networkidle', { timeout: 30000 })
//   })
//
//   test.afterEach(async ({ page, browserName }) => {
//     if (page.context.userData && page.context.userData[browserName]) {
//       delete page.context.userData[browserName]
//     }
//   })
//
//   test('should create user', async ({ page, browserName }) => {
//     const userData = page.context.userData[browserName]
//     console.log('userDataSet:  ', userData)
//     await expect(page).toHaveURL(siteMap.pages.basePage)
//     await expect(page).toHaveTitle('Automation Exercise')
//     await page.click(basePage.selectors.signUpBtn)
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//     await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!')
//     await loginPage.functions.fillSignUpForm(page, userData)
//     await expect(page).toHaveURL(siteMap.pages.signUpPage)
//     await expect(await page.textContent(SignUpPage.selectors.accInfoBlock)).toContain('Enter Account Information')
//     expect(await page.$eval(SignUpPage.selectors.nameRegField, (element) => element.value)).toContain(userData.firstName)
//     expect(await page.$eval(SignUpPage.selectors.emailRegField, (element) => element.value)).toContain(userData.email)
//     await signUpPage.functions.fillAccForm(page, userData)
//     await expect(await page.textContent(SignUpPage.selectors.accCreateHeader)).toContain('Account Created!')
//     await page.click(SignUpPage.selectors.continueBtn)
//     await page.waitForLoadState('networkidle', { timeout: 30000 })
//     await expect(page).toHaveURL(siteMap.pages.basePage)
//     expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`)
//   })
//
//   test('should login/logout user', async ({ page, browserName }) => {
//     const userData = page.context.userData[browserName] // Получаем пользовательские данные из контекста страницы для текущего браузера
//     console.log('userDataLogin:  ', userData)
//     await page.click(basePage.selectors.signUpBtn)
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//     await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account')
//     await loginPage.functions.fillLoginInForm(page, userData)
//     await expect(page).toHaveURL(siteMap.pages.basePage)
//     await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`)
//     await page.click(basePage.selectors.logoutBtn)
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//   })
//
//   test('failed to login with wrong password', async ({ page, browserName }) => {
//     const userData = page.context.userData[browserName] // Получаем пользовательские данные из контекста страницы для текущего браузера
//
//     await page.click(basePage.selectors.signUpBtn)
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//     await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!')
//     await page.fill(LoginPage.selectors.emailLogField, userData.email)
//     await page.fill(LoginPage.selectors.passLogField, userData.email)
//     await page.click(LoginPage.selectors.loginBtn)
//     const text = await page.evaluate(() => {
//       const element = document.querySelector('p[style="color: red;"]')
//       return element.textContent || element.innerText || element.firstChild.nodeValue
//     })
//     await expect(text).toContain('Your email or password is incorrect!')
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//   })
//
//   test('failed to login with wrong email', async ({ page, browserName }) => {
//     const userData = page.context.userData[browserName] // Получаем пользовательские данные из контекста страницы для текущего браузера
//
//     await page.click(basePage.selectors.signUpBtn)
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//     await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!')
//     await page.fill(LoginPage.selectors.emailLogField, 'example@example.com')
//     await page.fill(LoginPage.selectors.passLogField, userData.userPass)
//     await page.click(LoginPage.selectors.loginBtn)
//     const text = await page.evaluate(() => {
//       const element = document.querySelector('p[style="color: red;"]')
//       return element.textContent || element.innerText || element.firstChild.nodeValue
//     })
//     await expect(text).toContain('Your email or password is incorrect!')
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//   })
//
//   test('failed to register with exiting eMail ', async ({ page, browserName }) => {
//     const userData = page.context.userData[browserName] // Получаем пользовательские данные из контекста страницы для текущего браузера
//     await page.click(basePage.selectors.signUpBtn)
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//     await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!')
//     await page.fill(LoginPage.selectors.nameField, 'Error')
//     await page.fill(LoginPage.selectors.emailField, userData.email)
//     await page.click(LoginPage.selectors.signUpBtn)
//     const text = await page.evaluate(() => {
//       const element = document.querySelector('p[style="color: red;"]')
//       return element.textContent || element.innerText || element.firstChild.nodeValue
//     })
//     await expect(text).toContain('Email Address already exist!')
//     await expect(page).toHaveURL(siteMap.pages.signUpPage)
//   })
//
//   test('should login/delete user', async ({ page, browserName }) => {
//     const userData = page.context.userData[browserName] // Получаем пользовательские данные из контекста страницы для текущего браузера
//     console.log('userDataDel:  ', userData)
//     await page.click(basePage.selectors.signUpBtn)
//     await expect(page).toHaveURL(siteMap.pages.loginPage)
//     await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account')
//
//     await loginPage.functions.fillLoginInForm(page, userData)
//     await expect(page).toHaveURL(siteMap.pages.basePage)
//     await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`)
//     await page.click(basePage.selectors.deleteAccBtn)
//     await expect(page).toHaveURL(siteMap.pages.accDeletePage)
//     await expect(await page.textContent(SignUpPage.selectors.accDeleteHeader)).toContain('Account Deleted!')
//     await page.click(SignUpPage.selectors.continueBtn)
//     await expect(page).toHaveURL(siteMap.pages.basePage)
//   })
// })
