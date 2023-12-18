import "dotenv/config";
import { Pact } from "@pact-foundation/pact";
import { resolve } from "path";
import {
  eachLike,
  somethingLike,
} from "@pact-foundation/pact/src/dsl/matchers";
import { customerList } from "../request/customer.request";

const mockProvider = new Pact({
  consumer: "ebac-demo-store-admin",
  provider: "ebac-demo-store-server",
  port: parseInt(process.env.MOCK_PORT),
  log: resolve(process.cwd(), "logs", "pact.log"),
  dir: resolve(process.cwd(), "pacts"),
});

describe("Contract Costumer Test", () => {
  beforeAll(async () => {
    await mockProvider.setup().then(() => {
      mockProvider.addInteraction({
        uponReceiving: "a request",
        withRequest: {
          method: "POST",
          path: "/graphql",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk2NDQ5NzQyLCJleHAiOjE2OTY2MjI1NDJ9.kJcFKxwgE1d2jx2CnxY7Iq_QLPIIfd3ko7F2epFyi8w",
            "Content-type": "application/json",
          },
          body: {
            query:
              "query{customers{address{address_1,address_2,city,createdAt,customers:id,id,state,updatedAt,zip},createdAt,email,firstName,id,lastName,orders{createdAt,customer:id,discount,id,product{createdAt,description,id,itemPrice,name,orders:id,updatedAt},quantity,totalPrice,updatedAt},phone,updatedAt}}",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-type": "application/json",
          },
          body: {
            data: {
              customers: eachLike({
                address: {
                  address_1: somethingLike("Reis Rodovia"),
                  address_2: somethingLike("Suite 260"),
                  city: somethingLike("Hormino do Norte"),
                  createdAt: somethingLike("2023-10-04T20:07:39.767Z"),
                  customers: somethingLike("clnc6kbna0000i1l0ofuq2utl"),
                  id: somethingLike("clnc6kbna0000i1l0ofuq2utl"),
                  state: somethingLike("Amazonas"),
                  updatedAt: somethingLike("2023-10-04T20:07:39.767"),
                  zip: somethingLike(55971605),
                },
                createdAt: somethingLike("2023-10-04T20:07:52.614Z"),
                email: somethingLike("lucas@ebac.com"),
                firstName: somethingLike("Lucas"),
                id: somethingLike("clnc6klk60002i1l0ftdfl2hu"),
                lastName: somethingLike("Evangelista"),
                orders: somethingLike([]),
                phone: somethingLike("71999999999"),
                updatedAt: somethingLike("2023-10-04T20:07:52.614Z"),
              }),
            },
          },
        },
      });
    });
  });

  afterAll(async () => {
    await mockProvider.finalize();
  });

  afterEach(async () => {
    await mockProvider.verify();
  });

  it("should return consumer list", async () => {
    await customerList().then((response) => {
      const { firstName, lastName } = response.data.data.customers[0];
      console.log(firstName, lastName);

      expect(response.status).toEqual(200);
      expect(firstName).toBe("Lucas");
      expect(lastName).toBe("Evangelista");
    });
  });
});
