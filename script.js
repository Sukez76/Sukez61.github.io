// ===============================
// CONFIGURAÇÃO DA DATA FINAL
// ===============================
const dataAlvo = new Date();
dataAlvo.setHours(15, 0, 0, 0); // 15:00 em ponto

// ===============================
// ELEMENTOS
// ===============================
const contagemEl = document.getElementById("contador");
const presenteEl = document.getElementById("presentebox");
const telaPretaEl = document.getElementById("blackout");
const dialogoEl = document.getElementById("dialogobox");
const textoDialogoEl = document.getElementById("text");

// Som do Tenna enviado por você
const somTenna = new Audio("Tenna.mp3");

// ===============================
// SOM DE TIC A CADA SEGUNDO
// ===============================
function tocarTic() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.value = 800;

    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

// ===============================
// CONTADOR
// ===============================
function atualizarContagem() {
    const agora = new Date();
    let dif = dataAlvo - agora;

    if (dif <= 0) {
        iniciarSurpresa();
        return;
    }

    const h = Math.floor(dif / (1000 * 60 * 60));
    dif %= (1000 * 60 * 60);
    const m = Math.floor(dif / (1000 * 60));
    dif %= (1000 * 60);
    const s = Math.floor(dif / 1000);

    contagemEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// Executa contador + tic
setInterval(() => {
    atualizarContagem();
    tocarTic();
}, 1000);

// ===============================
// SEQUÊNCIA FINAL (surpresa)
// ===============================
function iniciarSurpresa() {
    contagemEl.style.display = "none";

    // Remove o intervalo do contador
    clearInterval();

    // Caixa abre (caso tenha animação)
    presenteEl.classList.add("open");

    // Espera 2s e escurece
    setTimeout(() => {
        telaPretaEl.style.opacity = "1";

        setTimeout(() => {
            iniciarDialogo();
        }, 1500);

    }, 2000);
}

// ===============================
// DIÁLOGO ESTILO DELTARUNE
// ===============================
const mensagem = "bom meu aniversariante preferido, aqui estar seu magnífico presente do fundo do poço";

let index = 0;

function iniciarDialogo() {
    dialogoEl.style.display = "block";
    textoDialogoEl.textContent = "";
    escrever();
}

function escrever() {
    if (index < mensagem.length) {
        textoDialogoEl.textContent += mensagem[index];

        // Som do Tenna a cada letra
        somTenna.currentTime = 0;
        somTenna.play();

        index++;
        setTimeout(escrever, 65);
    }
}
