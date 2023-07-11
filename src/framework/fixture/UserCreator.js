import { faker } from '@faker-js/faker';


export default class UserCreator {

  constructor() {
    this.userCounts = new Map();
  }

  async createUserDataSet(browserName) {
    const firstName = faker.person.firstName('male');
    let user;
    const userPass = faker.internet.password();
    const lastName = faker.person.lastName();
    let email = faker.internet.email({firstName,lastName});
    const timestamp = Date.now();
    email = `${timestamp}${email}`;
    const companyName = faker.company.name();
    const address = faker.location.streetAddress();
    const secAddress = faker.location.secondaryAddress();
    const state = faker.location.state();
    const city = faker.location.city();
    const zipCode = faker.location.zipCode('### ###');
    const phone = faker.phone.number('+7 9## ### ## ##');

    if (!this.userCounts.has(browserName)) {
      this.userCounts.set(browserName, 0);
    }

    const userId = this.userCounts.get(browserName) + 1;
    this.userCounts.set(browserName, userId);

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
      zipCode,
      browserName,
      userId,
    };
    // console.log(user)
    return user;
  }
}
