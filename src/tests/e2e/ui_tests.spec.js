import { test, expect } from '@playwright/test';
import siteMap from '../../framework/config/siteMap.js';
import BasePage from '../../framework/pages/BasePage.js';
import LoginPage from '../../framework/pages/LoginPage.js';
import SignUpPage from '../../framework/pages/SignUpPage.js';
import UserCreator from '../../framework/fixture/UserCreator.js';
import SetupTeardown from '../../framework/config/setupTeardown.js';

const basePage = new BasePage();
const loginPage = new LoginPage();
const signUpPage = new SignUpPage();
const createUserDataSet = new UserCreator();
const setupTeardown = new SetupTeardown();
let userData;

class TestSuite extends SetupTeardown {
    constructor() {
        super();
    }
}

test.describe('User CRUD Tests', () => {
    test.beforeAll(async () => {
        userData = await createUserDataSet.createUserDataSet();
    });

    test.beforeEach(async ({ page }) => {
        await setupTeardown.setupLoginTests({ page });
    });

    test.afterEach(async ({ page }) => {
        await setupTeardown.teardownTest({ page });
    });

    test('should create user', async ({ page }) => {
        userData = await userData;

        await test.step('Step 1: Verify initial page', async () => {
            await expect(page).toHaveURL(siteMap.pages.loginPage);
            await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!');
        });

        await test.step('Step 2: Fill in sign-up form', async () => {
            await loginPage.functions.fillSignUpForm(page, userData);
            await expect(page).toHaveURL(siteMap.pages.signUpPage);
            await expect(await page.textContent(SignUpPage.selectors.accInfoBlock)).toContain('Enter Account Information');
            const nameFieldValue = await page.$eval(SignUpPage.selectors.nameRegField, (el) => el.value);
            await expect(nameFieldValue).toContain(userData.firstName);
            const emailFieldValue = await page.$eval(SignUpPage.selectors.emailRegField, (el) => el.value);
            await expect(emailFieldValue).toContain(userData.email);
        });

        await test.step('Step 3: Submit the form', async () => {
            await signUpPage.functions.fillAccForm(page, userData);
            await expect(await page.textContent(SignUpPage.selectors.accCreateHeader)).toContain('Account Created!');
            await page.click(SignUpPage.selectors.continueBtn);
        });

        await test.step('Step 4: Verify successful sign-up', async () => {
            await expect(page).toHaveURL(siteMap.pages.basePage);
            await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`);
        });
    });


    test('should login/logout user', async ({ page }) => {
        userData = await userData;
        await expect(page).toHaveURL(siteMap.pages.loginPage);
        await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account');
        await loginPage.functions.fillLoginInForm(page, userData);
        await expect(page).toHaveURL(siteMap.pages.basePage);
        await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`);
        await page.click(basePage.selectors.logoutBtn);
        await expect(page).toHaveURL(siteMap.pages.loginPage);
    });

    test('failed to login with wrong password', async ({ page }) => {
        userData = await userData;
        await expect(page).toHaveURL(siteMap.pages.loginPage);
        await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account');
        await page.fill(LoginPage.selectors.emailLogField, userData.email);
        await page.fill(LoginPage.selectors.passLogField, 'wrongpassword');
        await page.click(LoginPage.selectors.loginBtn);
        const text = await page.textContent('p[style="color: red;"]');
        await expect(text).toContain('Your email or password is incorrect!');
        await expect(page).toHaveURL(siteMap.pages.loginPage);
    });

    test('failed to login with wrong email', async ({ page }) => {
        userData = await userData;
        await expect(page).toHaveURL(siteMap.pages.loginPage);
        await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account');
        await page.fill(LoginPage.selectors.emailLogField, 'wrongemail@example.com');
        await page.fill(LoginPage.selectors.passLogField, userData.userPass);
        await page.click(LoginPage.selectors.loginBtn);
        const text = await page.textContent('p[style="color: red;"]');
        await expect(text).toContain('Your email or password is incorrect!');
        await expect(page).toHaveURL(siteMap.pages.loginPage);
    });

    test('failed to register with existing email', async ({ page }) => {
        userData = await userData;
        await expect(page).toHaveURL(siteMap.pages.loginPage);
        await expect(await page.textContent(LoginPage.selectors.signUpForm)).toContain('New User Signup!');
        await loginPage.functions.fillSignUpForm(page, userData);
        const text = await page.textContent('p[style="color: red;"]');
        await expect(text).toContain('Email Address already exist!');
        await expect(page).toHaveURL(siteMap.pages.signUpPage);
    });

    test('should login/delete user', async ({ page }) => {
        userData = await userData;
        await expect(page).toHaveURL(siteMap.pages.loginPage);
        await expect(await page.textContent(LoginPage.selectors.loginForm)).toContain('Login to your account');
        await page.fill(LoginPage.selectors.emailLogField, userData.email);
        await page.fill(LoginPage.selectors.passLogField, userData.userPass);
        await page.click(LoginPage.selectors.loginBtn);
        await expect(page).toHaveURL(siteMap.pages.basePage);
        await expect(await page.textContent(basePage.selectors.loggedBy)).toContain(`Logged in as ${userData.firstName}`);
        await page.click(basePage.selectors.deleteAccBtn);
        await expect(page).toHaveURL(siteMap.pages.accDeletePage);
        await expect(await page.textContent(SignUpPage.selectors.accDeleteHeader)).toContain('Account Deleted!');
        await page.click(SignUpPage.selectors.continueBtn);
        await expect(page).toHaveURL(siteMap.pages.basePage);
    });
});

export default new TestSuite();
