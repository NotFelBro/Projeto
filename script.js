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

const formEnviarMensagem = document.querySelector(".chat-input");
const campoMensagem = formEnviarMensagem.querySelector("input[type='text]");
const listaMensagens = document.querySelector(".chat-mensagens");
const botaoEnviar = document.querySelector(".icone-enviar");

function obterHoraAtual() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    return `${horas}:{minutos}`;
}

function criarBalaoMensagem(texto, horario) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", "mensagem-enviada");

    const balao = document.createElement("div");
    balao.classList.add("balao");

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;

    const hora = document.createElement("span");
    hora.classList.add("hora-msg");
    hora.textContent = horario;

    balao.appendChild(paragrafo);
    balao.appendChild(hora);
    mensagem.appendChild(balao);

    return mensagem;
}
