let mistakes = 0;
const maxMistakes = 2; 

const levels = [
    {
        sequence: ["./IMG/Figuras_2/Niv1/Gota1.jpg", "./IMG/Figuras_2/Niv1/Gota2.jpg", "./IMG/Figuras_2/Niv1/Gota3.jpg", "./IMG/Figuras_2/Niv1/Gota4.jpg", "pregunta.png"],
        answer: "./IMG/Figuras_2/Niv1/Gota7.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv1/Gota1.jpg", "./IMG/Figuras_2/Niv1/Gota2.jpg", "./IMG/Figuras_2/Niv1/Gota5.jpg", "./IMG/Figuras_2/Niv1/Gota6.jpg", "./IMG/Figuras_2/Niv1/Gota7.jpg"]
    },
    {
        sequence: ["./IMG/Figuras_2/Niv2/L1.jpg", "./IMG/Figuras_2/Niv2/L2.jpg", "./IMG/Figuras_2/Niv2/L3.jpg", "./IMG/Figuras_2/Niv2/L4.jpg", "pregunta.png"],
        answer: "./IMG/Figuras_2/Niv2/L6.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv2/L2.jpg", "./IMG/Figuras_2/Niv2/L5.jpg", "./IMG/Figuras_2/Niv2/L6.jpg", "./IMG/Figuras_2/Niv2/L4.jpg", "./IMG/Figuras_2/Niv2/L7.jpg"]
    },
    {
        sequence: ["./IMG/Figuras_2/Niv3/C1.jpg", "./IMG/Figuras_2/Niv3/C2.jpg", "./IMG/Figuras_2/Niv3/C3.jpg", "./IMG/Figuras_2/Niv3/C4.jpg", "pregunta.png"],
        answer: "./IMG/Figuras_2/Niv3/C1.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv3/C1.jpg", "./IMG/Figuras_2/Niv3/C5.jpg", "./IMG/Figuras_2/Niv3/C4.jpg", "./IMG/Figuras_2/Niv3/C6.jpg", "./IMG/Figuras_2/Niv3/C3.jpg"]
    },
    {
        sequence: ["./IMG/Figuras_2/Niv4/CT1.jpg", "./IMG/Figuras_2/Niv4/CT2.jpg", "./IMG/Figuras_2/Niv4/CT3.jpg", "./IMG/Figuras_2/Niv4/CT4.jpg", "pregunta.png"],
        answer: "./IMG/Figuras_2/Niv4/CT7.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv4/CT5.jpg", "./IMG/Figuras_2/Niv4/CT6.jpg", "./IMG/Figuras_2/Niv4/CT7.jpg", "./IMG/Figuras_2/Niv4/CT4.jpg", "./IMG/Figuras_2/Niv4/CT8.jpg"]
    },
    {
        sequence: ["./IMG/Figuras_2/Niv5/TM1.jpg", "pregunta.png", "./IMG/Figuras_2/Niv5/PD1.jpg", "pregunta.png", "./IMG/Figuras_2/Niv5/PD2.jpg"],
        answer: "./IMG/Figuras_2/Niv5/TM3.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv5/TM2.jpg", "./IMG/Figuras_2/Niv5/TM3.jpg", "./IMG/Figuras_2/Niv5/TM4.jpg", "./IMG/Figuras_2/Niv5/TM5.jpg"]
    },
    {
        sequence: ["./IMG/Figuras_2/Niv6/CC1.jpg", "./IMG/Figuras_2/Niv6/CC2.jpg", "./IMG/Figuras_2/Niv6/CC3.jpg", "./IMG/Figuras_2/Niv6/CC4.jpg", "pregunta.png"],
        answer: "./IMG/Figuras_2/Niv6/CC1.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv6/CC1.jpg", "./IMG/Figuras_2/Niv6/CC5.jpg", "./IMG/Figuras_2/Niv6/CC6.jpg", "./IMG/Figuras_2/Niv6/CC2.jpg"]
    },
    {
        sequence: ["./IMG/Figuras_2/Niv7/D1.jpg", "./IMG/Figuras_2/Niv7/D2.jpg", "./IMG/Figuras_2/Niv7/D3.jpg", "./IMG/Figuras_2/Niv7/D4.jpg", "pregunta.png"],
        answer: "./IMG/Figuras_2/Niv7/D5.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv7/D2.jpg", "./IMG/Figuras_2/Niv7/D5.jpg", "./IMG/Figuras_2/Niv7/D6.jpg", "./IMG/Figuras_2/Niv7/D3.jpg", "./IMG/Figuras_2/Niv7/D4.jpg"]
    },
    {
        sequence: ["./IMG/Figuras_2/Niv8/Cuadro1.jpg", "./IMG/Figuras_2/Niv8/Cuadro2.jpg", "./IMG/Figuras_2/Niv8/Cuadro3.jpg", "./IMG/Figuras_2/Niv8/Cuadro1.jpg", "pregunta.png"],
        answer: "./IMG/Figuras_2/Niv8/Cuadro2.jpg",
        possibleAnswers: ["./IMG/Figuras_2/Niv8/Cuadro4.jpg",  "./IMG/Figuras_2/Niv8/Cuadro2.jpg", "./IMG/Figuras_2/Niv8/Cuadro6.jpg", "./IMG/Figuras_2/Niv8/Cuadro7.jpg", "./IMG/Figuras_2/Niv8/Cuadro3.jpg"]
    }
];

const urlParams = new URLSearchParams(window.location.search);
const nivel = parseInt(urlParams.get("nivel")) || 1;
startGame(nivel);

function startGame(levelIndex) {
    const gameContainer = document.getElementById("game-container");
    const optionsContainer = document.getElementById("options-container2");
    const levelTitle = document.getElementById("level-title");
    gameContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    optionsContainer.style.display = 'flex';
    
    if (levelIndex < 1 || levelIndex > levels.length) {
        levelTitle.textContent = "Nivel no disponible";
        return;
    }

    const level = levels[levelIndex - 1];
    levelTitle.textContent = `Nivel ${levelIndex}`;
    
    level.sequence.forEach(imgSrc => {
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.classList.add("sequence-image");
        gameContainer.appendChild(imgElement);
    });
    
    const options = generateOptions(level);
    options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-button");
        
        const imgOption = document.createElement("img");
        imgOption.src = option;
        imgOption.classList.add("option-image");
        
        button.appendChild(imgOption);
        button.onclick = (event) => checkAnswer(option, level.answer, event);
        optionsContainer.appendChild(button);
    });

    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('feedback').textContent = '';
    document.getElementById('restart').style.display = 'none';
}

function generateOptions(level) {
    let availableAnswers = level.possibleAnswers.filter(answer => answer !== level.answer);
    let shuffledIncorrect = availableAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
    let options = [level.answer, ...shuffledIncorrect];
    return options.sort(() => Math.random() - 0.5);
}

function lanzarConfeti() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, scalar: 2.0 });
}

function checkAnswer(selected, correct, event) {
    if (selected === correct) {
        document.getElementById('feedback').textContent = '¡Correcto!';
        lanzarConfeti();
        document.getElementById('window-notice').style.display = 'flex';
        document.getElementById('options-container2').style.display = 'none';
    } else {
        mistakes++;
        document.getElementById('contador-intentos').textContent = mistakes; // contabiliza los intentos

        // Aplica sacudida al botón presionado
        const btn = event.target;
        btn.classList.add('sacudir');
    
        // Elimina la clase después de que termine la animación
        setTimeout(() => {
            btn.classList.remove('sacudir');
        }, 400);


        if (mistakes < maxMistakes) {
            mostrarMensajeFlotante('Inténtalo de nuevo');

        } else {
            document.getElementById('feedback2').textContent = '¡Intentalo de nuevo!';
            document.getElementById('window-notice2').style.display = 'flex';
            document.getElementById('options-container2').style.display = 'none';
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
    mistakes = 0;
    document.getElementById('contador-intentos').textContent = mistakes; // Actualiza el contador a cero

    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('window-notice2').style.display = 'none';

    document.getElementById('options-container2').style.display = 'flex';
    
    startGame(nivel);
}

function nextLevel() {
    let nivelActual = parseInt(urlParams.get("nivel")) || 1;
    let nuevoNivel = nivelActual + 1;
    if (nuevoNivel <= levels.length) {
        window.location.href = `?nivel=${nuevoNivel}`;
    } else {
        document.getElementById('feedback').textContent = '¡Has completado todos los niveles!';
    }
}
