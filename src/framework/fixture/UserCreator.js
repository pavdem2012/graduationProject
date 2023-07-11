import faker from 'faker'


export default class UserCreator {

  constructor() {
    this.userCounts = new Map();
  }

  async createUserDataSet(browserName) {
    const firstName = faker.name.firstName('male');
    let user;
    const userPass = faker.internet.password();
    const lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName);
    const timestamp = Date.now();
    email = `${timestamp}${email}`
    const companyName = `${faker.company.bsAdjective()} ${faker.company.companySuffix()}`;
    const address = faker.address.streetAddress();
    const secAddress = faker.address.secondaryAddress();
    const state = faker.address.state();
    const city = faker.address.city();
    const zipCode = faker.address.zipCode();
    const phone = faker.fake('{{phone.phoneNumber}}');

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
    console.log(user)
    return user;
  }
}
