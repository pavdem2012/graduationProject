import siteMap from './siteMap.js'
import UserCreator from '../fixture/UserCreator.js'
import {expect} from "@playwright/test";
import BasePage  from "../pages/BasePage.js";

const basePage = new BasePage()
const createUserDataSet = new UserCreator()
const userDataSetMap = new Map()

const uniqueKeyPrefixes = new Map()

function generateUniqueKeyPrefix(browserName) {
    if (!uniqueKeyPrefixes.has(browserName)) {
        uniqueKeyPrefixes.set(browserName, generateUniqueId())
    }
    return uniqueKeyPrefixes.get(browserName)
}

function generateUniqueId() {
    // Генерация уникального идентификатора текущая дата и время
    return Date.now().toString()
}

// Логика для beforeEach
export async function setupTest({ page, browserName }) {
    let userDataSet;
    if (userDataSetMap.has(browserName)) {
        userDataSet = userDataSetMap.get(browserName);
    } else {
        const uniqueKeyPrefix = generateUniqueKeyPrefix(browserName);
        userDataSet = await createUserDataSet.createUserDataSet(uniqueKeyPrefix);
        userDataSetMap.set(browserName, userDataSet);
    }
    if (!page.context.userData) {
        page.context.userData = {};
    }
    page.context.userData[browserName] = userDataSet;
    page.context.userData[browserName].email = userDataSet.email; // Установка значения email
    await page.goto(siteMap.pages.basePage);
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await expect(page).toHaveURL(siteMap.pages.basePage);
    await expect(page).toHaveTitle('Automation Exercise');
    await page.click(basePage.selectors.signUpBtn);
}

// Логика для afterEach
export async function teardownTest({ page, browserName }) {
    if (page.context.userData && page.context.userData[browserName]) {
        delete page.context.userData[browserName]
    }
}

