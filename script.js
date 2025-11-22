// Defina o tempo da contagem regressiva (em segundos)
let countdownTime = 10 * 60;

const countdownElement = document.getElementById('countdown');
const tickSound = document.getElementById('tick-sound');

// Criar áudio de fundo
const backgroundMusic = new Audio('Glacier.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// Botão para iniciar música
const startButton = document.getElementById('start-music');
startButton.style.display = 'block'; // mostrar botão temporariamente

startButton.addEventListener('click', () => {
    backgroundMusic.play();
    startButton.style.display = 'none'; // esconder o botão após tocar
});

// Funções da contagem regressiva
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const hrs = Math.floor(mins / 60);
    const displayMins = mins % 60;
    return `${hrs.toString().padStart(2,'0')}:${displayMins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

function updateCountdown() {
    if (countdownTime <= 0) return;

    countdownElement.textContent = formatTime(countdownTime);

    tickSound.currentTime = 0;
    tickSound.play().catch(e => console.log('Som bloqueado até interação'));

    countdownTime--;
}

updateCountdown();
setInterval(updateCountdown, 1000);
