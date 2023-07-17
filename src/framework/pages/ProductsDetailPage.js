export default class productsDetailPage {
  selectors = {
    productName: 'div.product-information > h2',
    category: 'p:nth-child(3)',
    price: 'div.product-information > span > span',
    availability: 'p:nth-child(6) > b',
    condition: 'p:nth-child(7) > b',
    brand: 'p:nth-child(8) > b'
  }
}
