import axios from 'axios'
import siteMap from '../config/siteMap.js'
const url = siteMap.pages.apiUrl
const options = {
  validateStatus: false
}
let response
export const brandsListResp = async ({ path, method }) => {
  response = await axios[method.toLowerCase()](url + path, options)
  return response
}
