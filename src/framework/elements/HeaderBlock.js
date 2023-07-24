export default class HeaderBlock {
  selectors = {
    headerElem: '#header',
    signUpBtn: 'i[class="fa fa-lock"]',
    loggedBy: 'div.shop-menu li:last-child',
    logoutBtn: 'a[href="/logout"]',
    deleteAccBtn: 'a[href="/delete_account"]',
    contactUsBtn: 'a[href="/contact_us"]',
    testCasesBtn: 'a[href="/test_cases"]',
    productsBtn: 'a[href="/products"]',
    goToCartBtn: 'ul.nav>li>a>i.fa-shopping-cart'
  }
}
