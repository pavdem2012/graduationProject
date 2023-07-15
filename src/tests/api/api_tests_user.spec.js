import expect from 'expect'
import Ajv from 'ajv'
import ajvFormats from 'ajv-formats'

import schemas from '../../framework/schemas/multipleSchemas.json'
import UserCreator from '../../framework/fixture/UserCreator.js'

import {
  deleteAccount,
  generateUserFormData, getUserDetailByEmail,
  universUserController
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
  test('POST To Create/Register User Account', async () => {
    userData = await createUserDataSet.createUserDataSet()
    email = userData.email
    userPass = userData.userPass
    formData = new URLSearchParams()
    const userFormData = generateUserFormData(userData)
    for (const pair of userFormData.entries()) {
      formData.append(pair[0], pair[1])
    }
    formData.append('email', userData.email)
    formData.append('password', userData.userPass)
    formData.append('title', 'Mr')
    response = await universUserController({ path: '/createAccount', method: 'post', formData })
    expect(response.status).toEqual(201)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(201)
    expect(response.data.message).toBeDefined()
    expect(response.data.message).toContain('User created!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
    formData = new URLSearchParams()
  })
  test('POST To Verify Login with valid details', async () => {
    formData = new URLSearchParams()
    formData.append('email', email)
    formData.append('password', userPass)
    response = await universUserController({ path: '/verifyLogin', method: 'post', formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.message).toBeDefined()
    expect(response.data.message).toContain('User exists!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  test('POST To Verify Login without email parameter', async () => {
    formData = new URLSearchParams()
    formData.append('password', userPass)
    response = await universUserController({ path: '/verifyLogin', method: 'post', formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(400)
    expect(response.data.message).toBeDefined()
    expect(response.data.message).toContain('Bad request, email or password parameter is missing in POST request.')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  test('DELETE To Verify Login', async () => {
    response = await universUserController({ path: '/verifyLogin', method: 'delete' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(405)
    expect(response.data.message).toBeDefined()
    expect(response.data.message).toContain('This request method is not supported.')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })

  test('POST To Verify Login with invalid details', async () => {
    formData = new URLSearchParams()
    formData.append('email', 'example@example.example.example')
    formData.append('password', userPass)
    response = await universUserController({ path: '/verifyLogin', method: 'post', formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(404)
    expect(response.data.message).toBeDefined()
    expect(response.data.message).toContain('User not found!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })

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
    response = await universUserController({ path: '/updateAccount', method: 'put', formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.message).toBeDefined()
    expect(response.data.message).toContain('User updated!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
  test('GET user account detail by email', async () => {
    const searchParam = email
    response = await getUserDetailByEmail({ searchParam, path: '/getUserDetailByEmail' })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toBe(200)
    expect(response.data.user).toBeDefined()
    expect(response.data.user.id).toBeDefined()
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
  test('DELETE METHOD To Delete User Account', async () => {
    formData = new URLSearchParams()
    formData.append('email', email)
    formData.append('password', userPass)
    response = await deleteAccount({ path: '/deleteAccount', method: 'delete', formData })
    expect(response.status).toEqual(200)
    expect(response.statusText).toBe('OK')
    expect(response.data.responseCode).toBeDefined()
    expect(response.data.responseCode).toEqual(200)
    expect(response.data.message).toBeDefined()
    expect(response.data.message).toContain('Account deleted!')
    expect(ajv.validate(schemas.userChangeResponses, response.data)).toBe(true)
  })
})
