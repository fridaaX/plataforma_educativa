let nivelActual = new URLSearchParams(window.location.search).get('nivel') || 1;
let intentos = 0;
const maxintentos = 2;
let secuencia = [];
let opciones = [];
let correctIndex = 0;
const NumNiveles = 10;

function secuenciaNueva(level) {
    const min = 4;
    const max = 50;
    let valorIn, incremento, respCorrect;
    secuencia = [];
    const secuenciaLength = 5;

    switch (parseInt(level)) {
        case 1:
            // Descendente -3
            incremento = -3;
            valorIn = getValidvalorIn(min + 24, max, Math.abs(incremento), 4); 
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;
    
        case 2:
            const sumaResta = 10; // Total a restar: 1+2+3+4 = 10
            valorIn = getValidvalorIn(min, max, sumaResta, 1);
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(secuencia[i - 1] - i);
            }
            break;
    
        case 3:
            // Multiplicar por 2
            valorIn = Math.floor(Math.random() * 3) + 1; // 1–3 para que no se pase
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(secuencia[i - 1] * 2);
            }
            break;
    
        case 4:
            incremento = 4;
            do {
                valorIn = getValidvalorIn(min, max, incremento, 4);
            } while (valorIn % 2 === 0); // si es par, vuelve a intentarlo
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;
    
        case 5:
            incremento = 2;
            do {
                valorIn = getValidvalorIn(min + 15, max, incremento, 4);
            } while (valorIn % 2 === 0); // si es par, vuelve a intentarlo
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;

        case 6:
            // +9
            incremento = 9;
            valorIn = getValidvalorIn(min, max, incremento, 4);
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;
    
        case 7:
            // Descendente -7
            incremento = -7;
            valorIn = getValidvalorIn(min + 28, max, 1, 0);
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;
    
        case 8:
            // +5
            incremento = 5;
            valorIn = getValidvalorIn(min, max, incremento, 4);
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;
    
        case 9:
            // Descendente -6
            incremento = -6;
            valorIn = getValidvalorIn(min + 28, max, 1, 0);
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;
    
        case 10:
            // Incrementos crecientes: +1, +2, +3, +4...
            valorIn = getValidvalorIn(min, max, 1, 0);
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(secuencia[i - 1] + i);
            }
            break;
    
        default:
            // +1 constante
            incremento = 1;
            valorIn = getValidvalorIn(min, max, incremento, 4);
            secuencia = [valorIn];
            for (let i = 1; i < 5; i++) {
                secuencia.push(valorIn + incremento * i);
            }
            break;
    }
    

    // Coloca "?" en una posición aleatoria (excepto la última)
    const questionIndex = Math.floor(Math.random() * secuenciaLength);
    respCorrect = secuencia[questionIndex];
    secuencia[questionIndex] = "?";

    // Genera respuestas incorrectas
    let respErr1, respErr2;
    do {
        respErr1 = respCorrect + Math.floor(Math.random() * 5) + 1;
    } while (respErr1 === respCorrect || respErr1 < min || respErr1 > max);

    do {
        respErr2 = respCorrect - Math.floor(Math.random() * 5) - 1;
    } while (respErr2 === respCorrect || respErr2 === respErr1 || respErr2 < min || respErr2 > max);

    // Baraja opciones
    opciones = [respCorrect, respErr1, respErr2].sort(() => Math.random() - 0.5);
    correctIndex = opciones.indexOf(respCorrect);
}

function getValidvalorIn(min, max, incremento, reps) {
    const maxvalorIn = max - (incremento * reps);
    return Math.floor(Math.random() * (maxvalorIn - min + 1)) + min;
}

function getValidEvenvalorIn(min, max, reps) {
    let valorIn;
    do {
        valorIn = getValidvalorIn(min, max, 2, reps);
    } while (valorIn % 2 !== 0);
    return valorIn;
}

function getValidOddvalorIn(min, max, reps) {
    let valorIn;
    do {
        valorIn = getValidvalorIn(min, max, 2, reps);
    } while (valorIn % 2 === 0);
    return valorIn;
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

function loadLevel() {
    document.getElementById('level-title').textContent = `Nivel ${nivelActual}`;
    secuenciaNueva(nivelActual);

    const secuenciaContainer = document.getElementById('secuencia');
    secuenciaContainer.innerHTML = '';
    secuencia.forEach(num => {
        const img = document.createElement('img');
        img.src = num === "?" ? "pregunta.png" : `./IMG/Numeros/${num}.png`;
        secuenciaContainer.appendChild(img);
    });

    const buttons = document.querySelectorAll('.option');
    opciones.forEach((option, index) => {
        buttons[index].innerHTML = `<img src="./IMG/Numeros/${option}.png" alt="Número">`;
    });

    document.getElementById('feedback').textContent = '';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('opciones-container').style.display = 'flex';
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
        document.getElementById('opciones-container').style.display = 'none';
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
            document.getElementById('opciones-container').style.display = 'none';
        }
    }
}

function mostrarMensajeFlotante(texto) {
    const mensaje = document.getElementById('mensaje-flotante');
    mensaje.textContent = texto;
    mensaje.style.display = 'block';

    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 2000);
}


function reiniciar() {
    intentos = 0;
    document.getElementById('contador-intentos').textContent = intentos; // Actualiza el contador a cero

    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('window-notice2').style.display = 'none';
    loadLevel();
}

function nextLevel() {
    if (nivelActual < NumNiveles) {
        nivelActual++;
        intentos = 0;
        document.getElementById('contador-intentos').textContent = intentos;
        document.getElementById('window-notice').style.display = 'none';
        loadLevel();
    } else {
        document.getElementById('feedback').textContent = '¡Has completado todos los niveles!';
        document.getElementById('opciones-container').style.display = 'none'; // Opcional: oculta opciones
    }
}

loadLevel();
