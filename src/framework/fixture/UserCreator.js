import { faker } from '@faker-js/faker'
export default class UserCreator {
  async createUserDataSet () {
    let user
    const firstName = faker.person.firstName()
    const userPass = faker.internet.password()
    const lastName = faker.person.lastName()
    let email = faker.internet.email({ firstName, lastName })
    const timestamp = Date.now()
    email = `${timestamp}${email}`
    const companyName = faker.company.name()
    const address = faker.location.streetAddress()
    const secAddress = faker.location.secondaryAddress()
    const state = faker.location.state()
    const city = faker.location.city()
    const zipCode = faker.location.zipCode('### ###')
    const phone = faker.phone.number('+7 9## ### ## ##')
    // eslint-disable-next-line prefer-const
    user = {
      firstName,
      email,
      userPass,
      lastName,
      companyName,
      address,
      secAddress,
      phone,
      state,
      city,
      zipCode
    }
    return user
  }
}
