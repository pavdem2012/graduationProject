import axios from 'axios'
import siteMap from '../config/siteMap.js'
const url = siteMap.pages.apiUrl
const options = {
  validateStatus: false
}
let response
export const productsListResp = async ({ path, method }) => {
  response = await axios[method.toLowerCase()](url + path, options)
  return response
}
export const productsSearchResp = async ({ path, method, formData }) => {
  response = await axios[method.toLowerCase()](url + path, formData, options)
  return response
}
