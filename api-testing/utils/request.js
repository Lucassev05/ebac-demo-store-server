const req = require("supertest");
const { createAddressData, createCustomerData } = require("./createData");

const API_URL = process.env.API_URL;

const getAccessToken = async (user, pass) => {
  return req(API_URL)
    .post("/login")
    .send({
      username: user,
      password: pass,
    })
    .set("Accept", "application/json")
    .then((response) => {
      return response.body.accessToken;
    });
};

const setAddress = async (token) => {
  const address = await createAddressData();

  return req(API_URL)
    .post("/addresses")
    .send(address)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .then((response) => {
      return response.body;
    });
};

const createCustomer = async (token) => {
  const address = await setAddress(token);
  const newCustomer = await createCustomerData(address.id);

  return await req(API_URL)
    .post("/customers")
    .send(newCustomer)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .then((response) => {
      return response.body;
    });
};

const getRequest = async (path, token) => {
  return await req(API_URL)
    .get(path)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .then((response) => {
      return response;
    });
};

const postRequest = async (path, token, body) => {
  return await req(API_URL)
    .post(path)
    .send(body)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .then((response) => {
      return response;
    });
};

const patchRequest = async (path, token, body) => {
  return await req(API_URL)
    .patch(path)
    .send(body)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .then((response) => {
      return response;
    });
};

const deleteRequest = async (path, token) => {
  return await req(API_URL)
    .delete(path)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .then((response) => {
      return response;
    });
};

module.exports = {
  getAccessToken,
  setAddress,
  createCustomer,
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
};
