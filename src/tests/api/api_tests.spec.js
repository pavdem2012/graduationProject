import axios from 'axios'
import expect from 'expect'
import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'

import siteMap from '../../framework/config/siteMap.js'
import schemas from '../../framework/schemas/multipleSchemas.json'

const ajv = new Ajv({ allErrors: true })
ajvFormats(ajv)

/* global test */
// eslint-disable-next-line
describe('API products&brands tests', () => {
  test('Get All Products List', async () => {
    const response = await axios.get(`${siteMap.pages.apiUrl}/productsList`)
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
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
    const response = await axios.post(`${siteMap.pages.apiUrl}/productsList`)
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.message).toBeDefined()
    expect(response.data.responseCode).toEqual(405)
    expect(response.data.message).toContain('This request method is not supported.')
    expect(ajv.validate(schemas.productsBrandsListErr, response.data)).toBe(true)
  })

  test('Get All Brands List', async () => {
    const response = await axios.get(`${siteMap.pages.apiUrl}/brandsList`)
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
    const response = await axios.put(`${siteMap.pages.apiUrl}/brandsList`)
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
    const response = await axios.post(`${siteMap.pages.apiUrl}/searchProduct`, formData)
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
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
    const response = await axios.post(`${siteMap.pages.apiUrl}/searchProduct`)
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.message).toBeDefined()
    expect(response.data.responseCode).toEqual(400)
    expect(response.data.message).toContain('Bad request, search_product parameter is missing in POST request.')
    expect(ajv.validate(schemas.productsBrandsListErr, response.data)).toBe(true)
  })
})
