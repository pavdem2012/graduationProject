import client from './client.js'

export const userVerify = (options) => {
  delete options.url
  return client({
    method: 'post',
    url: '/verifyLogin',
    ...options
  })
}

export const userCreate = (options) => {
  delete options.url
  return client({
    method: 'post',
    url: '/createAccount',
    ...options
  })
}

export const userUpdate = (options) => {
  delete options.url
  return client({
    method: 'put',
    url: '/updateAccount',
    ...options
  })
}

export const getUser = (options) => {
  return client.get(`/getUserDetailByEmail?email=${options.data}`)
}

export const userDelete = (options) => {
  delete options.url
  return client({
    method: 'delete',
    url: '/deleteAccount',
    ...options
  })
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
