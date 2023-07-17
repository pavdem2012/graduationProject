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
}
