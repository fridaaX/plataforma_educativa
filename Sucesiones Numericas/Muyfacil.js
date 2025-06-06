let nivelActual = new URLSearchParams(window.location.search).get('nivel') || 1;
let intentos = 0;
const maxintentos = 2;
let secuencia = [];
let opciones = [];
let correctIndex = 0;
const NumNiveles = 10; 

function secuenciaNueva(level) {
    const min = 1;
    const max = 25;
    let valorIn, incremento, respCorrect;
    secuencia = [];

    switch (parseInt(level)) {
        case 1:
            incremento = 1;
            valorIn = getValidvalorIn(min, max, incremento, 3);
            break;
        case 2:
            incremento = 2;
            valorIn = getValidvalorIn(min, max, incremento, 3);
            break;
        case 3:
            incremento = -4;
            valorIn = getValidvalorIn(min + 3, max, incremento, 3);
            break;
        case 4:
            valorIn = getValidvalorIn(min, max - 6, 1, 3);
            secuencia = [valorIn, valorIn + 1, valorIn + 3, valorIn + 4];
            respCorrect = valorIn + 6;
        case 5:
            incremento = -1;
            valorIn = getValidvalorIn(min + 3, max, incremento, 3);
            break;
        case 6:
            incremento = 2;
            valorIn = getValidOddvalorIn(min, max, 3);
            break;
        case 7:
            incremento = -3;
            valorIn = getValidvalorIn(min + 9, max, incremento, 3); 
            secuencia = [valorIn, valorIn + incremento, valorIn + incremento * 2];
            respCorrect = valorIn + incremento * 3;
            break;
        case 8:
            incremento = 5;
            valorIn = getValidvalorIn(min, max, incremento, 3);
            secuencia = [valorIn, valorIn + incremento, valorIn + incremento * 2];
            respCorrect = valorIn + incremento * 3;
            break;
        case 9:
            valorIn = Math.floor(Math.random() * 3) + 1;
            secuencia = [valorIn, valorIn * 2, valorIn * 4];
            respCorrect = valorIn * 8;
            break;
        case 10:
            incremento = 4;
            valorIn = getValidvalorIn(4, max, incremento, 3);
            if (valorIn % 4 !== 0) valorIn += (4 - valorIn % 4);
            secuencia = [valorIn, valorIn + incremento, valorIn + incremento * 2];
            respCorrect = valorIn + incremento * 3;
            break;
        default:
            console.log("Juego finalizado.");
            break;
    }


    
    if (!secuencia.length) {
        secuencia = [valorIn, valorIn + incremento, valorIn + 2 * incremento];
        respCorrect = valorIn + 3 * incremento;
    }

    secuencia.push("?");

    let respErr1 = respCorrect + Math.floor(Math.random() * 3) + 1;
    let respErr2 = respCorrect - Math.floor(Math.random() * 3) - 1;

    respErr1 = clamp(respErr1, min, max);
    respErr2 = clamp(respErr2, min, max);

    opciones = [respCorrect, respErr1, respErr2];
    opciones = [...new Set(opciones)];

    while (opciones.length < 3) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!opciones.includes(rand)) opciones.push(rand);
    }

    opciones = opciones.sort(() => Math.random() - 0.5);
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
        document.getElementById('contador-intentos').textContent = intentos;

        const btn = event.target;
        btn.classList.add('sacudir');

        
        setTimeout(() => {
            btn.classList.remove('sacudir');
        }, 400);


        if (intentos < maxintentos) {
            mostrarMensajeFlotante('Inténtalo de nuevo');

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
    document.getElementById('contador-intentos').textContent = intentos;

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
        document.getElementById('opciones-container').style.display = 'none';
    }
}

loadLevel();
