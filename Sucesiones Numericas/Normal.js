let currentLevel = new URLSearchParams(window.location.search).get('nivel') || 1;
let intentos = 0;
const maxintentos = 2;
let sequence = [];
let options = [];
let correctIndex = 0;
const totalLevels = 10;

function generateSequence(level) {
    const min = 4;
    const max = 50;
    let start, step, correctAnswer;
    sequence = [];
    const sequenceLength = 5;

    switch (parseInt(level)) {
        case 1:
            // Alterna +2, +3
            start = getValidStart(min, max, 1, 0);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                const prev = sequence[i - 1];
                sequence.push(prev + (i % 2 === 0 ? 3 : 2));
            }
            break;
    
        case 2:
            // Resta progresiva: –1, –2, –3...
            start = getValidStart(20, max, 1, 1);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] - i);
            }
            break;
    
        case 3:
            // Multiplicar por 2
            start = Math.floor(Math.random() * 3) + 1; // 1–3 para que no se pase
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] * 2);
            }
            break;
    
        case 4:
            // +8
            step = 8;
            start = getValidStart(min, max, step, 4);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(start + step * i);
            }
            break;
    
        case 5:
            // Duplica el anterior
            start = Math.floor(Math.random() * 3) + 1; // 1–3 para que no crezca demasiado
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] * 2);
            }
            break;
    
        case 6:
            // Alterna +3 y -4
            start = getValidStart(min + 10, max - 10, 1, 1);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] + (i % 2 === 0 ? 3 : -4));
            }
            break;
    
        case 7:
            // Descendente -7
            step = -7;
            start = getValidStart(min + 28, max, 1, 0);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(start + step * i);
            }
            break;
    
        case 8:
            // Alterna +2, +5
            start = getValidStart(min, max - 20, 1, 0);
            sequence = [start];
            let alternator = true;
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] + (alternator ? 2 : 5));
                alternator = !alternator;
            }
            break;
    
        case 9:
            // Alterna +1, +2
            start = getValidStart(min, max, 1, 0);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] + (i % 2 === 0 ? 2 : 1));
            }
            break;
    
        case 10:
            // Incrementos crecientes: +1, +2, +3, +4...
            start = getValidStart(min, max, 1, 0);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(sequence[i - 1] + i);
            }
            break;
    
        default:
            // +1 constante
            step = 1;
            start = getValidStart(min, max, step, 4);
            sequence = [start];
            for (let i = 1; i < 5; i++) {
                sequence.push(start + step * i);
            }
            break;
    }
    

    // Coloca "?" en una posición aleatoria (excepto la última)
    const questionIndex = Math.floor(Math.random() * sequenceLength);
    correctAnswer = sequence[questionIndex];
    sequence[questionIndex] = "?";

    // Genera respuestas incorrectas
    let wrong1, wrong2;
    do {
        wrong1 = correctAnswer + Math.floor(Math.random() * 5) + 1;
    } while (wrong1 === correctAnswer || wrong1 < min || wrong1 > max);

    do {
        wrong2 = correctAnswer - Math.floor(Math.random() * 5) - 1;
    } while (wrong2 === correctAnswer || wrong2 === wrong1 || wrong2 < min || wrong2 > max);

    // Baraja opciones
    options = [correctAnswer, wrong1, wrong2].sort(() => Math.random() - 0.5);
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
