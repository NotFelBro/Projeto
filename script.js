import { indiceUsuario, listarMensagens } from "./assets/contatos.js";
import { listarUsuarios } from "./script.js";

export {usuarios, listarUsuarios, indiceUsuario, listarMensagens} from "./assets/contatos.js"; {

}

listarMensagens(0, 1)

const secaoLateral = document.querySelector(".secao-lateral");
const iconePerfilNav = document.querySelector(".icone-perfil-nav");
const iconeConversas = document.querySelector(".icone-conversas");
 
function abrirPerfil() {
    secaoLateral.classList.add("perfil-ativo");
}
 
function fecharPerfil() {
    secaoLateral.classList.remove("perfil-ativo");
}
 
iconePerfilNav.addEventListener("click", abrirPerfil);
iconeConversas.addEventListener("click", fecharPerfil);