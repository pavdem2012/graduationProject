import axios from 'axios'
import expect from 'expect'

/* global test */
test('should return correct data from API', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  console.log(response)
  expect(response.data.userId).toEqual(1)
  expect(response.data.id).toEqual(1)
  expect(response.data.title).toEqual('delectus aut autem')
  expect(response.data.completed).toEqual(false)
})
