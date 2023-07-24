import siteMap from './siteMap.js'
import { expect } from '@playwright/test'
import HeaderBlock from '../elements/HeaderBlock.js'

export default class SetupTeardown {
  constructor () {
    this.headerBlock = new HeaderBlock()
  }

  async setupLoginTests ({ page }) {
    await page.goto(siteMap.pages.basePage)
    await expect(page).toHaveURL(siteMap.pages.basePage)
    await expect(page).toHaveTitle('Automation Exercise')
    await page.click(this.headerBlock.selectors.signUpBtn)
  }

  async setupNavTests ({ page }) {
    await page.goto(siteMap.pages.basePage)
    await expect(page).toHaveURL(siteMap.pages.basePage)
    await expect(page).toHaveTitle('Automation Exercise')
  }

  async teardownTest ({ page }) {
    await page.close()
  }
}
