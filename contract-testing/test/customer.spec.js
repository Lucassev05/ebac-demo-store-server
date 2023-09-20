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
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk1MDYwNDI5LCJleHAiOjE2OTUyMzMyMjl9.5WZD_dmL9jV7SsXevI-tKBDPRxjzs0BPmtBrUDD5Muk",
            "Content-Type": "application/json",
          },
          body: {
            query: `query {
							customers {
								address {
								address_1,
								address_2,
								city,
								createdAt,
								customers: id,
								id,
								state,
								updatedAt,
								zip
							},
							createdAt,
							email,
							firstName,
							id,
							lastName,
							orders {
									createdAt,
									customer: id,
									discount,
									id,
									product {
										createdAt,
										description,
										id,
										itemPrice,
										name,
										orders: id ,
										updatedAt
									},
									quantity,
									totalPrice,
									updatedAt
								},
							phone,
							updatedAt
						}
						}
							`,
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            data: {
              customers: eachLike({
                address: {
                  address_1: somethingLike("Braga Alameda"),
                  address_2: somethingLike("Suite 358"),
                  city: somethingLike("Moraes do Sul"),
                  createdAt: somethingLike("2023-09-15T22:07:46.096Z"),
                  customers: somethingLike("clml5hlf4000ei12snpvpnrbg"),
                  id: somethingLike("clml5hlf4000ei12snpvpnrbg"),
                  state: somethingLike("Rio Grande do Norte"),
                  updatedAt: somethingLike("2023-09-15T22:07:46.096Z"),
                  zip: somethingLike(23944),
                },
                createdAt: somethingLike("2023-09-15T22:07:46.113Z"),
                email: somethingLike("Mrcia.Saraiva81@bol.com.br"),
                firstName: somethingLike("Tânia"),
                id: somethingLike("clml5hlfk000gi12sn2bfvs06"),
                lastName: somethingLike("Martins"),
                orders: somethingLike([]),
                phone: somethingLike("(44) 06866-5337"),
                updatedAt: somethingLike("2023-09-15T22:07:46.113Z"),
              }),
            },
          },
        },
      });
    });
  });

  afterAll(() => {
    mockProvider.finalize();
  });

  afterEach(() => {
    mockProvider.verify();
  });

  it("should return consumer list", () => {
    customerList().then((response) => {
      const { firstName, lastName } = response.data.data.customers[3];

      expect(response.status).toEqual(200);
      expect(firstName).toBe("Tânia");
      expect(lastName).toBe("Martins");
    });
  });
});
