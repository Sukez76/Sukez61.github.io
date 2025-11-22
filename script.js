// Defina o tempo da contagem regressiva (em segundos)
let countdownTime = 10 * 60; // exemplo: 10 minutos

const countdownElement = document.getElementById('countdown');
const tickSound = document.getElementById('tick-sound');

// Criar o áudio de fundo
const backgroundMusic = new Audio('Glacier.mp3');
backgroundMusic.loop = true;   // toca em loop
backgroundMusic.volume = 0.5;  // volume de 0 a 1

// Tentar tocar a música quando a página carregar
window.addEventListener('load', () => {
    backgroundMusic.play().catch(() => {
        console.log('Autoplay bloqueado pelo navegador. Interaja com a página para ouvir a música.');
    });
});

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

    // Tocar som de tick
    tickSound.currentTime = 0;
    tickSound.play().catch(e => console.log('Som bloqueado pelo navegador até interação'));

    countdownTime--;
}

updateCountdown();
setInterval(updateCountdown, 1000);
