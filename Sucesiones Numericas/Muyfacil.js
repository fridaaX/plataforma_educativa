let currentLevel = new URLSearchParams(window.location.search).get('nivel') || 1;
let intentos = 0;
const maxintentos = 2;
let sequence = [];
let options = [];
let correctIndex = 0;
const totalLevels = 10;

function generateSequence(level) {
    const min = 1;
    const max = 25;
    let start, step, correctAnswer;
    sequence = [];



    switch (parseInt(level)) {
        case 1:
            // +1 (e.g., 3, 4, 5, ?)
            step = 1;
            start = getValidStart(min, max, step, 3);
            break;
        case 2:
            // +2 (e.g., 2, 4, 6, ?)
            step = 2;
            start = getValidStart(min, max, step, 3);
            break;
        case 3:
            // Impares (e.g., 1, 3, 5, ?)
            step = 2;
            start = getValidOddStart(min, max, 3);
            break;
        case 4:
            // +3 (e.g., 3, 6, 9, ?)
            step = 3;
            start = getValidStart(min, max, step, 3);
            break;
        case 5:
            // Descendente -1 (e.g., 10, 9, 8, ?)
            step = -1;
            start = getValidStart(min + 3, max, step, 3);
            break;
        case 6:
            // Pares (e.g., 2, 4, 6, ?)
            step = 2;
            start = getValidEvenStart(min, max, 3);
            break;
        case 7:
            // -3, (e.g., 21, 18, 15, ?)
            step = -3;
            start = getValidStart(min + 9, max, step, 3); // Para que no sea muy bajo al restar
            sequence = [start, start + step, start + step * 2];
            correctAnswer = start + step * 3;
            break;
        case 8:
            // +5, (e.g., 5, 10, 15, ?
            step = 5;
            start = getValidStart(min, max, step, 3);
            sequence = [start, start + step, start + step * 2];
            correctAnswer = start + step * 3;
            break;
        case 9:
            // Multiplicación ×2 (e.g., 1, 2, 4, ?)
            start = Math.floor(Math.random() * 3) + 1; // 1, 2 o 3
            sequence = [start, start * 2, start * 4];
            correctAnswer = start * 8;
            break;
        case 10:
            // Multiplos de 4 (e.g., 4, 8, 12, ?)
            step = 4;
            start = getValidStart(4, max, step, 3);
            if (start % 4 !== 0) start += (4 - start % 4); // Asegurar múltiplo de 4
            sequence = [start, start + step, start + step * 2];
            correctAnswer = start + step * 3;
            break;
        default:
            console.log("Juego finalizado.");
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
            mostrarMensajeFlotante('Inténtalo de nuevo');

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
