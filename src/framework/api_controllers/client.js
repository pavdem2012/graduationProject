import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://automationexercise.com/api',
  validateStatus: false
})
export default instance
