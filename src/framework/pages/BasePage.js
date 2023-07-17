export default class basePage {
  selectors = {
    signUpBtn: 'i[class="fa fa-lock"]',
    loggedBy: 'div.shop-menu li:last-child',
    logoutBtn: 'a[href="/logout"]',
    deleteAccBtn: 'a[href="/delete_account"]',
    contactUsBtn: 'a[href="/contact_us"]',
    testCasesBtn: 'a[href="/test_cases"]',
    productsBtn: 'a[href="/products"]',
    viewCartBtn: 'a[href="/view_cart"]',
    susbscribeHeader: 'div.single-widget > h2',
    susbscribeEmailField: '#susbscribe_email',
    susbscribeEmailBtn: 'button.btn-default',
    alertSuccessMsg: 'div.alert-success'
  }
}
