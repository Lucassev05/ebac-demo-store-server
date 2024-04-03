import http from "k6/http";
import Utils from "../utils/utils.js";
import { check } from "k6";

export default class Login {
  #token;

  access(user, password) {
    let response = http.post(
      `${Utils.getBaseUrl()}/login`,
      JSON.stringify({
        username: user,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    this.#token = response.json("accessToken");

    check(response, {
      "status deve ser 201": (r) => r.status == 201,
    });
  }

  getToken() {
    return this.#token;
  }
}
