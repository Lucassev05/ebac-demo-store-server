const req = require("supertest");
const {
  getAccessToken,
  setAddress,
  createCustomer,
  postRequest,
  getRequest,
  patchRequest,
  deleteRequest,
} = require("../utils/request");
const { createCustomerData } = require("../utils/createData");

const API_URL = process.env.API_URL;

describe("Customers", () => {
  let token;
  beforeAll(async () => {
    token = await getAccessToken("admin", "admin");
  });

  it("(HealthCheck) List customers", async () => {
    await getRequest("/customers", token).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  it("(HealthCheck) Create customer", async () => {
    const addressId = await setAddress(token);
    const newCustomer = await createCustomerData(addressId.id);

    await postRequest("/customers", token, newCustomer).then((response) => {
      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  it("(HealthCheck) Get a specific customer", async () => {
    const customer = await createCustomer(token);

    await getRequest(`/customers/${customer.id}`, token).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toEqual(customer.id);
    });
  });

  it("(HealthCheck) Edit customer", async () => {
    const customer = await createCustomer(token);
    const addressId = await setAddress(token);
    const newCustomer = await createCustomerData(addressId.id);

    await patchRequest(`/customers/${customer.id}`, token, newCustomer).then(
      (response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toEqual(customer.id);
        expect(response.body.address.id).toEqual(newCustomer.address.id);
        expect(response.body.email).toEqual(newCustomer.email);
        expect(response.body.firstName).toEqual(newCustomer.firstName);
        expect(response.body.lastName).toEqual(newCustomer.lastName);
        expect(response.body.phone).toEqual(newCustomer.phone);
      }
    );
  });

  it("(HealthCheck) Delete customer", async () => {
    const customer = await createCustomer(token);

    await deleteRequest(`/customers/${customer.id}`, token).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(customer);
    });
  });

  // it("(HealthCheck) Create customer's order", async () => {});

  // it("(HealthCheck) List customer's order", async () => {});

  // it("(HealthCheck) Edit customer's order", async () => {});

  // it("(HealthCheck) Delete customer's order", async () => {});
});
