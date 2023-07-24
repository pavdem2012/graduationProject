export default class LeftMenu {
  selectors = {
    sideBarBlock: 'div.left-sidebar',
    sideBarWomen: {
      sideBarWomenItem: '#accordian > div:nth-child(1) > div.panel-heading > h4 > a > span > i',
      sideBarWomenItems: 'div[id=Women]',
      sideBarWomenDress: 'a[href="/category_products/1"]'
    },
    sideBarMen: {
      sideBarMenItem: '#accordian > div:nth-child(2) > div.panel-heading > h4 > a',
      sideBarMenItems: 'div[id=Men]',
      sideBarMenTShirts: 'a[href="/category_products/3"]'
    },
    sideBarBrandsBlock: 'div.brands_products',
    sideBarBrandsHeader: 'div.brands_products>h2',
    sideBarBrandsNames: {
      poloBrand: 'a[href="/brand_products/Polo"]',
      madameBrand: 'a[href="/brand_products/Madame"]'
    }
  }
}
