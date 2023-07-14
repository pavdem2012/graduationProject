import expect from 'expect'
import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'

import schemas from '../../framework/schemas/multipleSchemas.json'
import { productsListResp, productsSearchResp } from '../../framework/api_controllers/productsList.js'
import { brandsListResp } from '../../framework/api_controllers/brandsList.js'

const ajv = new Ajv({ allErrors: true })
ajvFormats(ajv)
let response

/* global test */
// eslint-disable-next-line
describe('API products&brands tests', () => {
  test('Get All Products List', async () => {
    response = await productsListResp({ path: '/productsList', method: 'get' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.products).toBeDefined()
    expect(Array.isArray(response.data.products)).toBe(true)
    expect(ajv.validate(schemas.productsList, response.data)).toBe(true)
    response.data.products.forEach((product) => {
      expect(product.brand).toBeDefined()
      expect(product.category).toBeDefined()
      expect(product.id).toBeDefined()
      expect(product.name).toBeDefined()
      expect(product.price).toBeDefined()
    })
  })
  test('POST To All Products List', async () => {
    response = await productsListResp({ path: '/productsList', method: 'post' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.message).toBeDefined()
    expect(response.data.responseCode).toEqual(405)
    expect(response.data.message).toContain('This request method is not supported.')
    expect(ajv.validate(schemas.productsBrandsListErr, response.data)).toBe(true)
  })

  test('Get All Brands List', async () => {
    response = await brandsListResp({ path: '/brandsList', method: 'get' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.brands).toBeDefined()
    expect(response.data.responseCode).toEqual(200)
    expect(Array.isArray(response.data.brands)).toBe(true)
    expect(ajv.validate(schemas.allBrandsList, response.data)).toBe(true)
    response.data.brands.forEach((brands) => {
      expect(brands.brand).toBeDefined()
      expect(brands.id).toBeDefined()
    })
  })

  test('PUT To All Brands List', async () => {
    response = await brandsListResp({ path: '/brandsList', method: 'put' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.message).toBeDefined()
    expect(response.data.responseCode).toEqual(405)
    expect(response.data.message).toContain('This request method is not supported.')
    expect(ajv.validate(schemas.productsBrandsListErr, response.data)).toBe(true)
  })

  const searchProducts = ['top', 'tshirt', 'jean']

  test.each(searchProducts)('POST To Search Product by "%s"', async (searchProduct) => {
    const formData = new URLSearchParams()
    formData.append('search_product', searchProduct)
    response = await productsSearchResp({ path: '/searchProduct', method: 'post', formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.products).toBeDefined()
    expect(Array.isArray(response.data.products)).toBe(true)
    expect(ajv.validate(schemas.searchProducts, response.data)).toBe(true)
    response.data.products.forEach((product) => {
      expect(product.brand).toBeDefined()
      expect(product.category).toBeDefined()
      expect(product.id).toBeDefined()
      expect(product.name).toBeDefined()
      expect(product.price).toBeDefined()
    })
  })

  test('POST To Search Product without search_product parameter', async () => {
    response = await productsSearchResp({ path: '/searchProduct', method: 'post' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.message).toBeDefined()
    expect(response.data.responseCode).toEqual(400)
    expect(response.data.message).toContain('Bad request, search_product parameter is missing in POST request.')
    expect(ajv.validate(schemas.productsBrandsListErr, response.data)).toBe(true)
  })
})
