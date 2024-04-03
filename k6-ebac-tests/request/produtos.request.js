import http from "k6/http";
import Utils from "../utils/utils.js";
import { check } from "k6";

export default class Produto {
  #createResponse;

  criar(data) {
    let response = http.post(
      `${Utils.getBaseUrl()}/products`,
      JSON.stringify({
        description: data.description,
        itemPrice: data.itemPrice,
        name: data.name,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${data.auth}`,
        },
      }
    );

    this.#createResponse = response.json();

    check(response, {
      "status deve ser 201": (r) => r.status == 201,
    });
  }

  getCreateResponse() {
    return this.#createResponse;
  }
}
