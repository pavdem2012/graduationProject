export default class SignUpPage {
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

  functions = {

    async fillAccForm (page, resolvedUserData) {
      await page.click(SignUpPage.selectors.titleRad)
      await page.type(SignUpPage.selectors.passRegField, resolvedUserData.userPass)
      await page.click(SignUpPage.selectors.dateRegField)
      await page.type(SignUpPage.selectors.dateRegField, '16')
      await page.type(SignUpPage.selectors.monthRegField, 'March')
      await page.type(SignUpPage.selectors.yearRegField, '1975')
      await page.click(SignUpPage.selectors.newsCheckBox)
      await page.click(SignUpPage.selectors.specCheckBox)
      await page.type(SignUpPage.selectors.firstNameField, resolvedUserData.firstName)
      await page.type(SignUpPage.selectors.lastNameField, resolvedUserData.lastName)
      await page.type(SignUpPage.selectors.companyField, resolvedUserData.companyName)
      await page.type(SignUpPage.selectors.addressField, resolvedUserData.address)
      await page.type(SignUpPage.selectors.address2Field, resolvedUserData.secAddress)
      await page.selectOption(SignUpPage.selectors.countryField, 'Australia')
      await page.type(SignUpPage.selectors.stateField, resolvedUserData.state)
      await page.type(SignUpPage.selectors.cityField, resolvedUserData.city)
      await page.type(SignUpPage.selectors.zipCodeField, resolvedUserData.zipCode)
      await page.type(SignUpPage.selectors.mobileNumField, resolvedUserData.phone)
      await page.waitForLoadState('domcontentloaded', { timeout: 30000 })
      await page.click(SignUpPage.selectors.createAccBtn)
    }
  }
}
