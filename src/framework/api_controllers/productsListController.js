import client from './client.js'
export const productsList = (options) => {
  delete options.url
  return client({
    url: '/productsList',
    ...options
  })
}

export const productsSearch = (options) => {
  delete options.url
  delete options.method
  return client({
    url: '/searchProduct',
    method: 'post',
    ...options
  })
}
