// ===============================
// CONFIGURAÇÃO DA DATA
// ===============================
const dataAlvo = new Date();
dataAlvo.setHours(15, 0, 0, 0);

// ELEMENTOS
const contador = document.getElementById("contador");
const blackout = document.getElementById("blackout");
const dialogobox = document.getElementById("dialogobox");
const text = document.getElementById("text");
const telaInicial = document.getElementById("telaInicial");

// Áudios
const musica = new Audio("Glacier.mp3");
musica.loop = true;

const tenna = new Audio("Tenna.mp3");

// LIBERAR ÁUDIO NO CELULAR
document.addEventListener("touchstart", () => {
    musica.play().catch(()=>{});
}, { once: true });

// ===============================
// TELA INICIAL
// ===============================
function iniciar() {
    telaInicial.style.display = "none";
    contador.style.display = "block";
    musica.play();
}

// ===============================
// TICK DE RELOGIO
// ===============================
function tic() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.value = 800;

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
}

// ===============================
// CONTADOR
// ===============================
function atualizar() {
    const agora = new Date();
    let dif = dataAlvo - agora;

    if (dif <= 0) {
        iniciarFinal();
        return;
    }

    const h = String(Math.floor(dif / 3600000)).padStart(2,"0");
    dif %= 3600000;
    const m = String(Math.floor(dif / 60000)).padStart(2,"0");
    dif %= 60000;
    const s = String(Math.floor(dif / 1000)).padStart(2,"0");

    contador.textContent = `${h}:${m}:${s}`;
    tic();
}
setInterval(atualizar, 1000);

// ===============================
// FINAL
// ===============================
function iniciarFinal() {
    musica.pause();
    musica.currentTime = 0;

    blackout.style.opacity = 1;

    setTimeout(() => {
        iniciarDialogo();
    }, 2000);
}

// TEXTO DO TENNA
const mensagem = "bom meu aniversariante preferido, aqui estar seu magnífico presente do fundo do poço";
let index = 0;

function iniciarDialogo() {
    dialogobox.style.display = "block";
    escrever();
}

function escrever() {
    if (index < mensagem.length) {
        text.textContent += mensagem[index];

        tenna.currentTime = 0;
        tenna.play();

        index++;
        setTimeout(escrever, 70);
    }
    }
