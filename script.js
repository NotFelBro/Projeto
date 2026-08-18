import { indiceUsuario, listarMensagens, usuarios } from "./assets/contatos.js";

export { usuarios, listarUsuarios, indiceUsuario, listarMensagens } from "./assets/contatos.js";

// ---------- Seção de Perfil ----------

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

// ---------- Conta ativa e lista de contatos ----------

const usuarioAtivo = usuarios["whats-users"][0];

const listaContatosEl = document.querySelector(".lista-contatos");
const chatHeaderEl = document.querySelector(".chat-header");
const chatHeaderFoto = document.querySelector(".chat-header-foto");
const chatHeaderNome = document.querySelector(".chat-header-nome");
const chatHeaderStatus = document.querySelector(".chat-header-status");
const chatVazioEl = document.querySelector(".chat-vazio");
const listaMensagens = document.querySelector(".chat-mensagens");

let conversaAtual = null;

function criarCardContato(contato) {
    const card = document.createElement("div");
    card.classList.add("card-contato");

    const foto = document.createElement("img");
    foto.alt = contato.name;
    foto.src = `./assets/imgs/${contato.image}`;
    foto.addEventListener("error", () => foto.removeAttribute("src"));

    const nome = document.createElement("span");
    nome.classList.add("nome");
    nome.textContent = contato.name;

    const ultimaMensagem = contato.messages[contato.messages.length - 1];

    const hora = document.createElement("span");
    hora.classList.add("hora");
    hora.textContent = ultimaMensagem ? ultimaMensagem.time : "";

    const msg = document.createElement("span");
    msg.classList.add("msg");
    msg.textContent = ultimaMensagem ? ultimaMensagem.content : "";

    card.append(foto, nome, hora, msg);
    card.addEventListener("click", () => abrirConversa(contato, card));

    return card;
}

function renderizarListaContatos() {
    listaContatosEl.innerHTML = "";
    usuarioAtivo.contacts.forEach((contato) => {
        listaContatosEl.appendChild(criarCardContato(contato));
    });
}

function criarBalaoMensagem(mensagem) {
    const tipo = mensagem.sender === "me" ? "mensagem-enviada" : "mensagem-recebida";

    const elMensagem = document.createElement("div");
    elMensagem.classList.add("mensagem", tipo);

    const balao = document.createElement("div");
    balao.classList.add("balao");

    const paragrafo = document.createElement("p");
    paragrafo.textContent = mensagem.content;

    const hora = document.createElement("span");
    hora.classList.add("hora-msg");
    hora.textContent = mensagem.time;

    balao.append(paragrafo, hora);
    elMensagem.appendChild(balao);

    return elMensagem;
}

function renderizarMensagens(contato) {
    listaMensagens.innerHTML = "";
    contato.messages.forEach((mensagem) => {
        listaMensagens.appendChild(criarBalaoMensagem(mensagem));
    });
    listaMensagens.scrollTop = listaMensagens.scrollHeight;
}

function abrirConversa(contato, elementoCard) {
    conversaAtual = contato;

    // destaca o contato selecionado na lista
    listaContatosEl
        .querySelectorAll(".card-contato.ativo")
        .forEach((card) => card.classList.remove("ativo"));
    elementoCard.classList.add("ativo");

    // cabeçalho da conversa
    chatHeaderFoto.alt = contato.name;
    chatHeaderFoto.src = `./assets/imgs/${contato.image}`;
    chatHeaderFoto.addEventListener("error", () => chatHeaderFoto.removeAttribute("src"), { once: true });
    chatHeaderNome.textContent = contato.name;
    chatHeaderStatus.textContent = contato.description || "";

    // troca o estado vazio pelas mensagens
    chatVazioEl.classList.add("oculto");
    chatHeaderEl.classList.remove("oculto");
    listaMensagens.classList.remove("oculto");

    renderizarMensagens(contato);
}

renderizarListaContatos();

// ---------- Envio de mensagem ----------

const formEnviarMensagem = document.querySelector(".chat-input");
const campoMensagem = formEnviarMensagem.querySelector("input[type='text']");
const botaoEnviar = document.querySelector(".icone-enviar");

function obterHoraAtual() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
}

function enviarMensagem(evento) {
    evento.preventDefault();

    const texto = campoMensagem.value.trim();
    if (!texto || !conversaAtual) return;

    const novaMensagem = { sender: "me", content: texto, time: obterHoraAtual() };
    conversaAtual.messages.push(novaMensagem);

    listaMensagens.appendChild(criarBalaoMensagem(novaMensagem));

    campoMensagem.value = "";
    campoMensagem.focus();
    listaMensagens.scrollTop = listaMensagens.scrollHeight;
}

formEnviarMensagem.addEventListener("submit", enviarMensagem);
botaoEnviar.addEventListener("click", enviarMensagem);

listarMensagens(0, 1);