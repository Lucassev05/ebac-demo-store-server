import http from "k6/http";
import { group } from "k6";
import Login from "../request/login.request.js";
import Produto from "../request/produtos.request.js";
import data from "../data/usuarios.json";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "5s", target: 50 },
    { duration: "10s", target: 10 },
    { duration: "5s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99) < 1000"],
  },
};

export default function () {
  let login = new Login();
  let produto = new Produto();
  group("login and get token", () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass);
  });

  group("criar produtos", () => {
    let data = {
      description: "teste",
      itemPrice: 1,
      name: "teste",
      auth: login.getToken(),
    };
    produto.criar(data);
  });
}
