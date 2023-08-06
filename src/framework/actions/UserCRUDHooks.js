import { generateUserFormData, userCreate, userDelete } from '../api_controllers/userController.js'
import UserCreator from '../fixture/UserCreator.js'
const createUserDataSet = new UserCreator()
let formData
export default class UserCRUDHooks {
  async userSetHook (userData) {
    userData = await createUserDataSet.createUserDataSet()
    formData = new URLSearchParams()
    const userFormData = generateUserFormData(userData)
    for (const pair of userFormData.entries()) {
      formData.set(pair[0], pair[1])
    }
    formData.set('email', userData.email)
    formData.set('password', userData.userPass)
    formData.set('title', 'Mr')
    await userCreate({ data: formData })
    return userData
  }

  async userDeleteHook (userData) {
    formData = new URLSearchParams()
    formData.append('email', userData.email)
    formData.append('password', userData.userPass)
    await userDelete({ data: formData })
  }
}
