const req = require("supertest");
const {
  getAccessToken,
  setAddress,
  postRequest,
  getRequest,
  patchRequest,
  deleteRequest,
} = require("../utils/request");
const { createAddressData } = require("../utils/createData");

describe("Address", () => {
  let token;
  beforeAll(async () => {
    token = await getAccessToken("admin", "admin");
  });

  it("(HealthCheck) List addresses", async () => {
    await getRequest("/addresses", token).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  it("(HealthCheck) Create address", async () => {
    const newAddress = await createAddressData();

    await postRequest("/addresses", token, newAddress).then((response) => {
      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  it("(HealthCheck) Get a specific address", async () => {
    const address = await setAddress(token);

    await getRequest(`/addresses/${address.id}`, token).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toEqual(address.id);
    });
  });

  it("(HealthCheck) Edit address", async () => {
    const address = await setAddress(token);
    const newAddress = await createAddressData();

    await patchRequest(`/addresses/${address.id}`, token, newAddress).then(
      (response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.id).toEqual(address.id);
        expect(response.body.state).toEqual(newAddress.state);
        expect(response.body.zip).toEqual(newAddress.zip);
        expect(response.body.address_1).toEqual(newAddress.address_1);
        expect(response.body.address_2).toEqual(newAddress.address_2);
      }
    );
  });

  it("(HealthCheck) Delete address", async () => {
    const address = await setAddress(token);

    await deleteRequest(`/addresses/${address.id}`, token).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(address);
    });
  });

  // it("(HealthCheck) Create customer's order", async () => {});

  // it("(HealthCheck) List customer's order", async () => {});

  // it("(HealthCheck) Edit customer's order", async () => {});

  // it("(HealthCheck) Delete customer's order", async () => {});
});
