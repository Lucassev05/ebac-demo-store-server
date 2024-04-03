import { group } from "k6";
import Login from "../request/login.request.js";
import data from "../data/usuarios.json";
import Cliente from "../request/clientes.request.js";

export default function () {
  let login = new Login();
  let cliente = new Cliente();

  group("login, create address and get token", () => {
    login.access(data.usuarioOk.user, data.usuarioOk.pass);
  });

  group("criar clientes", () => {
    let token = login.getToken();
    cliente.criar(token);
  });
}
