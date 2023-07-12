import siteMap from './siteMap.js';
import { expect } from "@playwright/test";
import BasePage from "../pages/BasePage.js";

export default class SetupTeardown {
    constructor() {
        this.basePage = new BasePage();
    }

    async setupLoginTests({ page }) {
        await page.goto(siteMap.pages.basePage);
        await expect(page).toHaveURL(siteMap.pages.basePage);
        await expect(page).toHaveTitle('Automation Exercise');
        await page.click(this.basePage.selectors.signUpBtn);
    }

    async teardownTest({ page }) {
        await page.close();
    }

}
