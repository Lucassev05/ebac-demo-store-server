import "dotenv/config";
import axios from "axios";
import data from "../data/customer.payload.json";

const baseUrl = `http://localhost:${process.env.MOCK_PORT}`;

export const customerList = async () => {
  return await axios.post(`${baseUrl}/graphql`, data, {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk2NDQ5NzQyLCJleHAiOjE2OTY2MjI1NDJ9.kJcFKxwgE1d2jx2CnxY7Iq_QLPIIfd3ko7F2epFyi8w",
      "Content-Type": 'application/json',
    },
  });
};
