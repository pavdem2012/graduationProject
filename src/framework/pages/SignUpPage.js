export default class signUpPage {
  static selectors = {
    accInfoBlock: 'div[class="login-form"]',
    titleRad: '.radio-inline',
    nameRegField: 'input[data-qa="name"]',
    emailRegField: 'input[data-qa="email"]',
    passRegField: 'input[data-qa="password"]',
    dateRegField: 'select[data-qa="days"]',
    monthRegField: 'select[data-qa="months"]',
    yearRegField: 'select[data-qa="years"]',
    newsCheckBox: 'input[name="newsletter"]',
    specCheckBox: 'input[name="optin"]',
    firstNameField: 'input[data-qa="first_name"]',
    lastNameField: 'input[data-qa="last_name"]',
    companyField: 'input[data-qa="company"]',
    addressField: 'input[data-qa="address"]',
    address2Field: 'input[data-qa="address2"]',
    countryField: 'select[data-qa="country"]',
    stateField: 'input[data-qa="state"]',
    cityField: 'input[data-qa="city"]',
    zipCodeField: 'input[data-qa="zipcode"]',
    mobileNumField: 'input[data-qa="mobile_number"]',
    createAccBtn: 'button[data-qa="create-account"]',
    accCreateHeader: 'h2[data-qa="account-created"]',
    continueBtn: 'a[data-qa="continue-button"]',
    accDeleteHeader: 'h2[data-qa="account-deleted"]'
  }

  async fillAccForm (page, resolvedUserData) {
    await page.click(signUpPage.selectors.titleRad)
    await page.type(signUpPage.selectors.passRegField, resolvedUserData.userPass)
    await page.click(signUpPage.selectors.dateRegField)
    await page.type(signUpPage.selectors.dateRegField, '16')
    await page.type(signUpPage.selectors.monthRegField, 'March')
    await page.type(signUpPage.selectors.yearRegField, '1975')
    await page.click(signUpPage.selectors.newsCheckBox)
    await page.click(signUpPage.selectors.specCheckBox)
    await page.type(signUpPage.selectors.firstNameField, resolvedUserData.firstName)
    await page.type(signUpPage.selectors.lastNameField, resolvedUserData.lastName)
    await page.type(signUpPage.selectors.companyField, resolvedUserData.companyName)
    await page.type(signUpPage.selectors.addressField, resolvedUserData.address)
    await page.type(signUpPage.selectors.address2Field, resolvedUserData.secAddress)
    await page.selectOption(signUpPage.selectors.countryField, 'Australia')
    await page.type(signUpPage.selectors.stateField, resolvedUserData.state)
    await page.type(signUpPage.selectors.cityField, resolvedUserData.city)
    await page.type(signUpPage.selectors.zipCodeField, resolvedUserData.zipCode)
    await page.type(signUpPage.selectors.mobileNumField, resolvedUserData.phone)
    await page.waitForLoadState('domcontentloaded', { timeout: 30000 })
    await page.click(signUpPage.selectors.createAccBtn)
  }

  async getElementValue (page, selector) {
    const element = await page.$(selector)
    return element ? await page.evaluate((el) => el.value, element) : null
  }
}
