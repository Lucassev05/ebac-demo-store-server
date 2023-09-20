import "dotenv/config";
import axios from "axios";
import data from "../data/customer.payload.json";

const baseUrl = `http://localhost:${process.env.MOCK_PORT}`;

export const customerList = async () => {
  return await axios.post(`${baseUrl}/graphql`, data, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk1MDYwNDI5LCJleHAiOjE2OTUyMzMyMjl9.5WZD_dmL9jV7SsXevI-tKBDPRxjzs0BPmtBrUDD5Muk",
      "Content-Type": "application/json",
    },
  });
};
