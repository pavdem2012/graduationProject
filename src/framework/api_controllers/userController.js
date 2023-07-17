import axios from 'axios'
import siteMap from '../config/siteMap.js'
const url = siteMap.pages.apiUrl
let options = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  validateStatus: false
}
let response

// // eslint-disable-next-line prefer-const
export const universUserController = async ({ path, method, formData }) => {
  response = await axios[method.toLowerCase()](url + path, formData, options)
  return response
}

export const deleteAccount = async ({ path, method, formData }) => {
  options = {
    ...options,
    data: formData.toString()
  }
  response = await axios[method.toLowerCase()](url + path, options)
  return response
}
export const getUserDetailByEmail = async ({ searchParam, path }) => {
  searchParam = `?email=${searchParam}`
  response = await axios.get(`${url}${path}${searchParam}`)
  return response
}
export const generateUserFormData = (userData) => {
  const formData = new URLSearchParams()
  formData.append('name', userData.firstName)
  formData.append('birth_date', (Math.floor(Math.random() * 28) + 1).toString())
  formData.append('birth_month', (Math.floor(Math.random() * 12) + 1).toString())
  formData.append('birth_year', (Math.floor(Math.random() * (2010 - 1950 + 1)) + 1950).toString())
  formData.append('firstname', userData.firstName)
  formData.append('lastname', userData.lastName)
  formData.append('company', userData.companyName)
  formData.append('address1', userData.address)
  formData.append('address2', userData.secAddress)
  formData.append('country', 'Australia')
  formData.append('zipcode', userData.zipCode)
  formData.append('state', userData.state)
  formData.append('city', userData.city)
  formData.append('mobile_number', userData.phone)
  return formData
}
