const faker = require("faker-br");

const createAddressData = async () => {
  const address = {
    address_1: faker.address.streetName(),
    address_2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: parseFloat(faker.address.zipCode().replace(/[^0-9]/g, "")),
  };

  return address;
};

const createCustomerData = async (addressId) => {
  const newCustomer = {
    address: {
      id: addressId,
    },
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
  };

  return newCustomer;
};

module.exports = { createAddressData, createCustomerData };
