import client from './client.js'
export const productsBrands = (options) => {
  delete options.url
  return client({
    url: '/brandsList',
    ...options
  })
}
