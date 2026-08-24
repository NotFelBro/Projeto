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

let usuarioAtivo = usuarios["whats-users"][0];

const perfilFotoEl = document.querySelector(".perfil-foto");
const perfilNomeEl = document.querySelector(".perfil-valor-nome");
const perfilTelefoneEl = document.querySelector(".perfil-valor-telefone");
const listaPerfisEl = document.querySelector(".lista-perfis");

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

// ---------- Perfil ativo e troca de perfil ----------

function formatarTelefone(numero) {
    const digitos = String(numero).replace(/\D/g, "");
    const ddd = digitos.slice(0, 2);
    const resto = digitos.slice(2);

    if (resto.length === 9) {
        return `+55 ${ddd} ${resto.slice(0, 5)} ${resto.slice(5)}`;
    }
    if (resto.length === 8) {
        return `+55 ${ddd} ${resto.slice(0, 4)} ${resto.slice(4)}`;
    }
    return `+55 ${ddd} ${resto}`;
}

function renderizarPerfilAtivo() {
    const foto = usuarioAtivo["profile-image"] || "";

    iconePerfilNav.src = foto;
    perfilFotoEl.src = foto;
    perfilNomeEl.textContent = usuarioAtivo.account;
    perfilTelefoneEl.textContent = formatarTelefone(usuarioAtivo.number);
}

function criarCardPerfil(usuario) {
    const item = document.createElement("div");
    item.classList.add("perfil-item");

    const foto = document.createElement("img");
    foto.src = usuario["profile-image"] || "";
    foto.alt = usuario.nickname;

    const nome = document.createElement("span");
    nome.textContent = usuario.nickname;

    item.append(foto, nome);
    item.addEventListener("click", () => trocarPerfil(usuario.id));

    return item;
}

function renderizarListaPerfis() {
    listaPerfisEl.innerHTML = "";
    usuarios["whats-users"]
        .filter((usuario) => usuario.id !== usuarioAtivo.id)
        .forEach((usuario) => listaPerfisEl.appendChild(criarCardPerfil(usuario)));
}

function trocarPerfil(novoUsuarioId) {
    const novoUsuario = usuarios["whats-users"].find((usuario) => usuario.id === novoUsuarioId);
    if (!novoUsuario || novoUsuario === usuarioAtivo) return;

    usuarioAtivo = novoUsuario;
    conversaAtual = null;

    // volta para a lista de conversas do novo perfil
    fecharPerfil();
    chatHeaderEl.classList.add("oculto");
    listaMensagens.classList.add("oculto");
    listaMensagens.innerHTML = "";
    chatVazioEl.classList.remove("oculto");

    renderizarPerfilAtivo();
    renderizarListaContatos();
    renderizarListaPerfis();
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

// ---------- Filtros de conversas (Tudo / Não lidas / Favoritos / Grupos) ----------

const botoesFiltro = document.querySelectorAll(".botoes > button");

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach((b) => b.classList.remove("ativo"));
        botao.classList.add("ativo");
    });
});

renderizarPerfilAtivo();
renderizarListaContatos();
renderizarListaPerfis();

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