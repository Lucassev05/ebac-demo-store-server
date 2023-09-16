const req = require("supertest");
const {
  getAccessToken,
  setAddress,
  createCustomer,
  postRequest,
  getRequest,
} = require("../utils/request");
const { createCustomerData } = require("../utils/createData");

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
    const newCustomer = await createCustomerData(addressId);

    await postRequest("/customers", token, newCustomer).then((response) => {
      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  it("(HealthCheck) Get specific customer", async () => {
    const consumerId = await createCustomer(token);

    await getRequest(`/customers/${consumerId}`, token).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toEqual(consumerId);
    });
  });

  // it("(HealthCheck) Edit customer", async () => {
  //   // await req(API_URL)
  //   //   .get("/customers")
  //   //   .set("Accept", "application/json")
  //   //   .set("Authorization", `Bearer ${token}`)
  //   //   .then((response) => {
  //   //     expect(response.statusCode).toEqual(200);
  //   //     expect(response.body).toBeInstanceOf(Array);
  //   //   });
  // });

  // it("(HealthCheck) Delete customer", async () => {
  //   // await req(API_URL)
  //   //   .get("/customers")
  //   //   .set("Accept", "application/json")
  //   //   .set("Authorization", `Bearer ${token}`)
  //   //   .then((response) => {
  //   //     expect(response.statusCode).toEqual(200);
  //   //     expect(response.body).toBeInstanceOf(Array);
  //   //   });
  // });

  // it("(HealthCheck) Create customer's order", async () => {
  //   // await req(API_URL)
  //   //   .get("/customers")
  //   //   .set("Accept", "application/json")
  //   //   .set("Authorization", `Bearer ${token}`)
  //   //   .then((response) => {
  //   //     expect(response.statusCode).toEqual(200);
  //   //     expect(response.body).toBeInstanceOf(Array);
  //   //   });
  // });
  // it("(HealthCheck) List customer's order", async () => {
  //   // await req(API_URL)
  //   //   .get("/customers")
  //   //   .set("Accept", "application/json")
  //   //   .set("Authorization", `Bearer ${token}`)
  //   //   .then((response) => {
  //   //     expect(response.statusCode).toEqual(200);
  //   //     expect(response.body).toBeInstanceOf(Array);
  //   //   });
  // });
  // it("(HealthCheck) Edit customer's order", async () => {
  //   // await req(API_URL)
  //   //   .get("/customers")
  //   //   .set("Accept", "application/json")
  //   //   .set("Authorization", `Bearer ${token}`)
  //   //   .then((response) => {
  //   //     expect(response.statusCode).toEqual(200);
  //   //     expect(response.body).toBeInstanceOf(Array);
  //   //   });
  // });
  // it("(HealthCheck) Delete customer's order", async () => {
  //   // await req(API_URL)
  //   //   .get("/customers")
  //   //   .set("Accept", "application/json")
  //   //   .set("Authorization", `Bearer ${token}`)
  //   //   .then((response) => {
  //   //     expect(response.statusCode).toEqual(200);
  //   //     expect(response.body).toBeInstanceOf(Array);
  //   //   });
  // });
});
