const moleContainer = document.getElementById('mole-container');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

let score = 0;
let timeLeft = 30;
let moleInterval = null;
let countdownInterval = null;

function createMoleHoles() {
    moleContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.className = 'mole-hole';

        const mole = document.createElement('div');
        mole.className = 'mole';
        mole.addEventListener('click', () => hitMole(mole));

        hole.appendChild(mole);
        moleContainer.appendChild(hole);
    }
}

function getRandomMole() {
    const moles = document.querySelectorAll('.mole');
    const randomMole = moles[Math.floor(Math.random() * moles.length)];
    return randomMole;
}

function showRandomMole() {
    const randomMole = getRandomMole();
    randomMole.classList.add('active');
    setTimeout(() => randomMole.classList.remove('active'), 800);
}

function hitMole(mole) {
    if (mole.classList.contains('active')) {
        score++;
        scoreDisplay.textContent = score;
        mole.classList.remove('active');
    }
}

function startWhackAMole() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;

    startButton.disabled = true;

    moleInterval = setInterval(showRandomMole, 1000);
    countdownInterval = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(moleInterval);
            clearInterval(countdownInterval);
            alert(`Game Over! Your final score is ${score}.`);
            startButton.disabled = false;
        }
    }, 1000);
}

function resetWhackAMole() {
    clearInterval(moleInterval);
    clearInterval(countdownInterval);
    startButton.disabled = false;
    createMoleHoles();
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;
}

// Initialize the game
createMoleHoles();
