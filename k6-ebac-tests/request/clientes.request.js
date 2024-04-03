import http from "k6/http";
import Utils from "../utils/utils.js";
import { check } from "k6";
import Leite from "leite";

export default class Cliente {
  #createResponse;
  leite = new Leite();

  criar(auth) {
    let response = http.post(
      `${Utils.getBaseUrl()}/customers`,
      JSON.stringify({
        address: {
          id: "clnc6kbna0000i1l0ofuq2utl",
        },
        email: this.leite.pessoa.email(),
        firstName: this.leite.pessoa.primeiroNome(),
        lastName: this.leite.pessoa.sobrenome(),
        phone: "71999999999",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
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
