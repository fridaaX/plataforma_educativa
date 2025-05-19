let currentLevel = new URLSearchParams(window.location.search).get('nivel') || 1;
let intentos = 0;
const maxintentos = 2;
let sequence = [];
let options = [];
let correctIndex = 0;
const totalLevels = 10;

function generateSequence(level) {
    const min = 9;
    const max = 40;
    let start, step, correctAnswer;
    sequence = [];

    switch (parseInt(level)) {
        case 1:
            // +6 (e.g., 3, 4, 5, ?)
            step = 6;
            start = getValidStart(min, max, step, 3);
            break;
        case 2:
            // Descendente -4 (e.g., 10, 9, 8, ?)
            step = -4;
            start = getValidStart(min + 3, max, step, 3);
            break;
        case 3:
            step = 4;
            start = getValidOddStart(min, max, step, 3);
            sequence = [start, start + step, start + step * 2];
            correctAnswer = start + step * 3;
            break;
        case 4:
            // +3 (e.g., 3, 6, 9, ?)
            step = 3;
            start = getValidStart(min, max, step, 3);
            break;
        case 5:
            // Restar de 2 en 2s
            step = -2;
            start = getValidStart(7, max, Math.abs(step), 3); 
            sequence = [start, start + step, start + 2 * step];
            correctAnswer = start + 3 * step;
            break;
        case 6:
            //Alterna entre +1 y -1
            start = getValidStart(min + 1, max - 1, 1, 1);
            sequence = [start, start + 1, start]; // +1, -1
            correctAnswer = start + 1;
            break;
        case 7:
            // +8 (e.g., 3, 6, 9, ?)
            step = 8;
            start = getValidStart(min, max, step, 3);
            break;
        case 8:
            // Alternar 2 y 3
            start = getValidStart(min, max - 5, 1, 1);
            sequence = [start, start + 2, start + 5]; // +2, +3
            correctAnswer = start + 7; // siguiente +2
            break;
        case 9:
            // Alterna +1, +2 (e.g., 2, 3, 5, ?)
            start = getValidStart(min, max, 1, 0); // No usa step fijo
            sequence = [start, start + 1, start + 1 + 2, start + 1 + 3];
            correctAnswer = start + 1 + 2 + 1 + 2;
            break;
        case 10:
            // Alterna +1, +3 (e.g., 2, 3, 5, ?)
            start = getValidStart(min, max, 1, 0); // No usa step fijo
            sequence = [start, start + 1, start + 1 + 3, start + 1 + 4];
            correctAnswer = start + 5 + 3;
            break;
        default:
            // Por defecto +1
            step = 1;
            start = getValidStart(min, max, step, 3);
            break;
    }

    // Solo si no se llenó la secuencia con un patrón específico arriba
    if (!sequence.length) {
        sequence = [start, start + step, start + 2 * step];
        correctAnswer = start + 3 * step;
    }

    sequence.push("?");

    // Opciones con distractores
    let wrong1 = correctAnswer + Math.floor(Math.random() * 3) + 1;
    let wrong2 = correctAnswer - Math.floor(Math.random() * 3) - 1;

    wrong1 = clamp(wrong1, min, max);
    wrong2 = clamp(wrong2, min, max);

    options = [correctAnswer, wrong1, wrong2];
    options = [...new Set(options)];

    while (options.length < 3) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!options.includes(rand)) options.push(rand);
    }

    options = options.sort(() => Math.random() - 0.5);
    correctIndex = options.indexOf(correctAnswer);
}

function getValidStart(min, max, step, reps) {
    const maxStart = max - (step * reps);
    return Math.floor(Math.random() * (maxStart - min + 1)) + min;
}

function getValidEvenStart(min, max, reps) {
    let start;
    do {
        start = getValidStart(min, max, 2, reps);
    } while (start % 2 !== 0);
    return start;
}

function getValidOddStart(min, max, reps) {
    let start;
    do {
        start = getValidStart(min, max, 2, reps);
    } while (start % 2 === 0);
    return start;
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function loadLevel() {
    document.getElementById('level-title').textContent = `Nivel ${currentLevel}`;
    generateSequence(currentLevel);

    const sequenceContainer = document.getElementById('sequence');
    sequenceContainer.innerHTML = '';
    sequence.forEach(num => {
        const img = document.createElement('img');
        img.src = num === "?" ? "pregunta.png" : `./IMG/Numeros/${num}.png`;
        sequenceContainer.appendChild(img);
    });

    const buttons = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        buttons[index].innerHTML = `<img src="./IMG/Numeros/${option}.png" alt="Número">`;
    });

    document.getElementById('feedback').textContent = '';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('options-container').style.display = 'flex';
}

function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        scalar: 2.0
    });
}

function checkAnswer(selected, event) {
    if (selected === correctIndex) {
        document.getElementById('feedback').textContent = '¡Correcto!';
        lanzarConfeti();
        document.getElementById('window-notice').style.display = 'flex';
        document.getElementById('options-container').style.display = 'none';
    } else {
        intentos++;
        document.getElementById('contador-intentos').textContent = intentos; // contabiliza los intentos


        // Aplica sacudida al botón presionado
        const btn = event.target;
        btn.classList.add('sacudir');

        // Elimina la clase después de que termine la animación
        setTimeout(() => {
            btn.classList.remove('sacudir');
        }, 400);


        if (intentos < maxintentos) {
            mostrarMensajeFlotante('Ups! Inténtalo de nuevo');

        } else { 
            document.getElementById('feedback2').textContent = '¡Intentalo de nuevo!';
            document.getElementById('window-notice2').style.display = 'flex';
            document.getElementById('options-container').style.display = 'none';
        }
    }
}

function mostrarMensajeFlotante(texto) {
    const mensaje = document.getElementById('mensaje-flotante');
    mensaje.textContent = texto;
    mensaje.style.display = 'block';

    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 2000); // desaparece a los 2 segundos
}

function restartGame() {
    intentos = 0;
    document.getElementById('contador-intentos').textContent = intentos; // Actualiza el contador a cero

    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('window-notice2').style.display = 'none';
    loadLevel();
}

function nextLevel() {
    if (currentLevel < totalLevels) {
        currentLevel++;
        intentos = 0;
        document.getElementById('contador-intentos').textContent = intentos;
        document.getElementById('window-notice').style.display = 'none';
        loadLevel();
    } else {
        document.getElementById('feedback').textContent = '¡Has completado todos los niveles!';
        document.getElementById('options-container').style.display = 'none'; // Opcional: oculta opciones
    }
}

loadLevel();
