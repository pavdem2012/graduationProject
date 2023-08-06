import expect from 'expect'
import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'

import schemas from '../../framework/schemas/multipleSchemas.json'
import UserCreator from '../../framework/fixture/UserCreator.js'

import {
  generateUserFormData,
  getUser,
  userCreate,
  userDelete,
  userUpdate,
  userVerify
} from '../../framework/api_controllers/userController.js'

const ajv = new Ajv({ allErrors: true })
ajvFormats(ajv)
let response
const createUserDataSet = new UserCreator()

// eslint-disable-next-line
let userData
let email
let userPass
let updateUserData
let formData
/* global test */
// eslint-disable-next-line
describe('userTests', () => {
  /**
   * API 11: POST To Create/Register User Account
   * API URL: https://automationexercise.com/api/createAccount
   * Request Method: POST
   * Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
   * Response Code: 201
   * Response Message: User created!
   */
  test('POST To Create/Register User Account', async () => {
    userData = await createUserDataSet.createUserDataSet()
    email = userData.email
    userPass = userData.userPass
    formData = new URLSearchParams()
    const userFormData = generateUserFormData(userData)
    for (const pair of userFormData.entries()) {
      formData.set(pair[0], pair[1])
    }
    formData.set('email', userData.email)
    formData.set('password', userData.userPass)
    formData.set('title', 'Mr')
    response = await userCreate({ data: formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toEqual(201)
    expect(response.data.message).toContain('User created!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  /**
   * API 7: POST To Verify Login with valid details
   * API URL: https://automationexercise.com/api/verifyLogin
   * Request Method: POST
   * Request Parameters: email, password
   * Response Code: 200
   * Response Message: User exists!
   */
  test('POST To Verify Login with valid details', async () => {
    formData = new URLSearchParams()
    formData.set('email', email)
    formData.set('password', userPass)
    response = await userVerify({ data: formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.message).toContain('User exists!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  /**
   * API 8: POST To Verify Login without email parameter
   * API URL: https://automationexercise.com/api/verifyLogin
   * Request Method: POST
   * Request Parameter: password
   * Response Code: 400
   * Response Message: Bad request, email or password parameter is missing in POST request.
   */
  test('POST To Verify Login without email parameter', async () => {
    formData = new URLSearchParams()
    formData.append('password', userPass)
    response = await userVerify({ formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toEqual(400)
    expect(response.data.message).toContain('Bad request, email or password parameter is missing in POST request.')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  /**
   * API 9: DELETE To Verify Login
   * API URL: https://automationexercise.com/api/verifyLogin
   * Request Method: DELETE
   * Response Code: 405
   * Response Message: This request method is not supported.
   */
  test('DELETE To Verify Login', async () => {
    response = await userVerify({ method: 'delete' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toEqual(405)
    expect(response.data.message).toContain('This request method is not supported.')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  /**
   * API 10: POST To Verify Login with invalid details
   * API URL: https://automationexercise.com/api/verifyLogin
   * Request Method: POST
   * Request Parameters: email, password (invalid values)
   * Response Code: 404
   * Response Message: User not found!
   */
  test('POST To Verify Login with invalid details', async () => {
    formData = new URLSearchParams()
    formData.set('email', 'example@example.example.example')
    formData.set('password', userPass)
    response = await userVerify({ data: formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toEqual(404)
    expect(response.data.message).toContain('User not found!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  /**
   * API 13: PUT METHOD To Update User Account
   * API URL: https://automationexercise.com/api/updateAccount
   * Request Method: PUT
   * Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
   * Response Code: 200
   * Response Message: User updated!
   */
  test('PUT METHOD To Update User Account', async () => {
    formData = new URLSearchParams()
    userData = await createUserDataSet.createUserDataSet()
    const userFormData = generateUserFormData(userData)
    for (const pair of userFormData.entries()) {
      formData.append(pair[0], pair[1])
    }
    formData.append('email', email)
    formData.append('password', userPass)
    formData.append('title', 'Mrs')
    updateUserData = formData
    response = await userUpdate({ path: '/updateAccount', method: 'put', data: formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.message).toContain('User updated!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  /**
   * API 14: GET user account detail by email
   * API URL: https://automationexercise.com/api/getUserDetailByEmail
   * Request Method: GET
   * Request Parameters: email
   * Response Code: 200
   * Response JSON: User Detail
   */
  test('GET user account detail by email', async () => {
    response = await getUser({ data: email })
    console.log(response.data)
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBe(200)
    expect(typeof response.data.user.id).toBe('number')
    expect(response.data.user.name).toBe(updateUserData.get('name'))
    expect(response.data.user.email).toBe(updateUserData.get('email'))
    expect(response.data.user.title).toBe(updateUserData.get('title'))
    expect(response.data.user.birth_day).toBe(updateUserData.get('birth_date'))
    expect(response.data.user.birth_month).toBe(updateUserData.get('birth_month'))
    expect(response.data.user.birth_year).toBe(updateUserData.get('birth_year'))
    expect(response.data.user.first_name).toBe(updateUserData.get('firstname'))
    expect(response.data.user.last_name).toBe(updateUserData.get('lastname'))
    expect(response.data.user.company).toBe(updateUserData.get('company'))
    expect(response.data.user.address1).toBe(updateUserData.get('address1'))
    expect(response.data.user.address2).toBe(updateUserData.get('address2'))
    expect(response.data.user.country).toBe(updateUserData.get('country'))
    expect(response.data.user.state).toBe(updateUserData.get('state'))
    expect(response.data.user.city).toBe(updateUserData.get('city'))
    expect(response.data.user.zipcode).toBe(updateUserData.get('zipcode'))
    expect(ajv.validate(schemas.userInfo, response.data)).toBe(true)
  })
  /**
   * API 12: DELETE METHOD To Delete User Account
   * API URL: https://automationexercise.com/api/deleteAccount
   * Request Method: DELETE
   * Request Parameters: email, password
   * Response Code: 200
   * Response Message: Account deleted!
   */
  test('DELETE METHOD To Delete User Account', async () => {
    formData = new URLSearchParams()
    formData.append('email', email)
    formData.append('password', userPass)
    response = await userDelete({ path: '/deleteAccount', method: 'delete', data: formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.message).toContain('Account deleted!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
})
