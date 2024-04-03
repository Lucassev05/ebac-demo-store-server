import http from "k6/http";
import Utils from "../utils/utils.js";
import { check } from "k6";
import Leite from "leite";

export default class Endereco {
  leite = new Leite();
  #addressId = "clnc6kbna0000i1l0ofuq2utl";

  criar(auth) {
    let response = http.post(
      `${Utils.getBaseUrl()}/addresses`,
      JSON.stringify({
        address_1: this.leite.localizacao.logradouro(),
        address_2: this.leite.localizacao.complemento(),
        city: this.leite.localizacao.cidade(),
        state: this.leite.localizacao.estado(),
        zip: this.leite.localizacao.cep(),
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    this.#addressId = response.json("id");

    check(response, {
      "status deve ser 201": (r) => r.status == 201,
    });
  }

  getAddressId() {
    return this.#addressId;
  }
}
