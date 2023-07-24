import fs from 'fs'
export default class contactUsPage {
  selectors = {
    contactUsFormHeader: 'div.contact-form > h2',
    contactUsFormName: 'input[data-qa="name"]',
    contactUsFormEmail: 'input[data-qa="email"]',
    contactUsFormSubject: 'input[data-qa="subject"]',
    contactUsFormMessage: 'textarea[data-qa="message"]',
    contactUsFormUploadBtn: 'input[name="upload_file"]',
    contactUsFormSubmitBtn: 'input[name="submit"]',
    contactUsFormSuccessMsg: 'div.status'
  }

  async fillContactUsForm ({ page }) {
    await page.fill(this.selectors.contactUsFormName, 'user')
    await page.fill(this.selectors.contactUsFormEmail, 'example@example.example')
    await page.fill(this.selectors.contactUsFormSubject, 'error')
    await page.fill(this.selectors.contactUsFormMessage, 'A small error has occurred')
    fs.writeFileSync('test_file.txt', 'This is a test file for uploading.')
    const handle = await page.$(this.selectors.contactUsFormUploadBtn)
    await handle.setInputFiles('./test_file.txt')
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 })
  }
}
