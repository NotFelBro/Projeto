import { indiceUsuario, listarMensagens, usuarios } from "./assets/contatos.js";
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

//==========================================================
const usuarioAtivo = usuarios["whats-users"][0];

const listaContatosEl = document.querySelector(".lista-contatos");
const chatHeaderEl = document.querySelector(".chat-header");
const chatHeaderFoto = document.querySelector(".chat-header-foto");
const chatHEaderNome = document.querySelector(".chat-header-nome");
const chatHeaderStatus = document.querySelector(".chat-header-status");
const chatVazioEl = document.querySelector(".chat-vazio");
const listaMensagens = document.querySelector(".chat-mensagens");

let conversaAtual = null;

function criarCardContato(contato) {
    const card = document.createElement("div");
    card.classList.add("card-contato");

    const foto = document.createElement("img");
    foto.alt = contato.nome;
    foto.src = `./assets/imgs/${contato.image}`;
}

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

function enviarMensagem(evento) {
    evento.preventDefault();

    const texto = campoMensagem.ariaValueMax.trim();
    if (!texto) return;

    const balao = criarBalaoMensagem(texto, obterHoraAtual());
    listaMensagens.appendChild(balao);

    campoMensagem.value = "";
    campoMensagem.focus();
    listaMensagens.scrollTop = listaMensagens.scrollHeight;
}

formEnviarMensagem.addEventListener("submit", enviarMensagem);
botaoEnviar.addEventListener("click", enviarMensagem);
