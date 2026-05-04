import { faker } from '@faker-js/faker';

export const Credentials = {
  validUser: {
    validUserName: 'standard_user',
    validPassword: 'secret_sauce',
  },
};

export const LoginNegativData = [
  {
    name: 'Invalid password test',
    userName: Credentials.validUser.validUserName,
    pass: faker.internet.password(),
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'Invalid username',
    userName: faker.internet.username(),
    pass: Credentials.validUser.validPassword,
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'Empty username',
    userName: '',
    pass: Credentials.validUser.validPassword,
    error: 'Epic sadface: Username is required',
  },
  {
    name: 'Empty password',
    userName: Credentials.validUser.validUserName,
    pass: '',
    error: 'Epic sadface: Password is required',
  },
  {
    name: 'All empty spaces',
    userName: '',
    pass: '',
    error: 'Epic sadface: Username is required',
  },
];

export const PurchaseFlowData = {
  products: ['Backpack', 'Bike Light'],
  expectedCartCount: '2',
  expectedSuccessHeader: 'Thank you for your order!',
  zipPattern: '#####',
};