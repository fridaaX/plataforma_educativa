let mistakes = 0;
const maxMistakes = 2; 

const levels = [
    {
        sequence: ["./IMG/Frutas/T1.png", "./IMG/Frutas/F4.png", "./IMG/Frutas/T3.png", "./IMG/Frutas/F2.png","./IMG/Frutas/T1.png", "pregunta.png"],
        answer: "./IMG/Frutas/F4.png",
        possibleAnswers: ["./IMG/Frutas/F2.png", "./IMG/Frutas/T2.png", "./IMG/Frutas/T3.png", "./IMG/Frutas/F1.png", 
            "./IMG/Frutas/T1.png", "./IMG/Frutas/F3.png", "./IMG/Frutas/T4.png"]
    },
    {
        sequence: ["./IMG/Frutas/N3.png", "./IMG/Frutas/Pe2.png", "./IMG/Frutas/Po4.png", "./IMG/Frutas/N3.png","./IMG/Frutas/Pe2.png", "pregunta.png"],
        answer: "./IMG/Frutas/Po4.png",
        possibleAnswers: ["./IMG/Frutas/Pe1.png", "./IMG/Frutas/Pe2.png", "./IMG/Frutas/Po2.png", "./IMG/Frutas/Po3.png", 
            "./IMG/Frutas/N1.png", "./IMG/Frutas/N3.png", "./IMG/Frutas/N2.png"]
    },
    {
        sequence: ["./IMG/Frutas/M1.png", "./IMG/Frutas/M3.png", "./IMG/Frutas/M1.png", "./IMG/Frutas/T3.png","./IMG/Frutas/M1.png", "pregunta.png"],
        answer: "./IMG/Frutas/M3.png",
        possibleAnswers: ["./IMG/Frutas/M1.png", "./IMG/Frutas/M2.png", "./IMG/Frutas/T1.png", "./IMG/Frutas/T2.png", 
            "./IMG/Frutas/M4.png", "./IMG/Frutas/T3.png", "./IMG/Frutas/T4.png"]
    },
    {
        sequence: ["./IMG/Frutas/F4.png", "./IMG/Frutas/N2.png", "./IMG/Frutas/M2.png", "./IMG/Frutas/T1.png","./IMG/Frutas/F4.png", "pregunta.png"],
        answer: "./IMG/Frutas/N2.png",
        possibleAnswers: ["./IMG/Frutas/F1.png", "./IMG/Frutas/F2.png", "./IMG/Frutas/N3.png", "./IMG/Frutas/N4.png", 
            "./IMG/Frutas/T1.png", "./IMG/Frutas/T2.png", "./IMG/Frutas/T3.png"]
    },
    {
        sequence: ["./IMG/Frutas/Pe4.png", "./IMG/Frutas/Pe1.png", "./IMG/Frutas/N2.png", "./IMG/Frutas/Pe3.png","./IMG/Frutas/Pe4.png", "pregunta.png"],
        answer: "./IMG/Frutas/N1.png",
        possibleAnswers: ["./IMG/Frutas/N3.png", "./IMG/Frutas/N4.png", "./IMG/Frutas/Pe1.png", "./IMG/Frutas/Pe2.png", 
            "./IMG/Frutas/Pe3.png", "./IMG/Frutas/N4.png", "./IMG/Frutas/Pe4.png"]
    },
    {
        sequence: ["./IMG/Frutas/T2.png", "./IMG/Frutas/N4.png", "./IMG/Frutas/N2.png", "./IMG/Frutas/N4.png","./IMG/Frutas/T2.png", "pregunta.png"],
        answer: "./IMG/Frutas/N4.png",
        possibleAnswers: ["./IMG/Frutas/T1.png", "./IMG/Frutas/T2.png", "./IMG/Frutas/T3.png", "./IMG/Frutas/N1.png", 
            "./IMG/Frutas/N2.png", "./IMG/Frutas/N3.png", "./IMG/Frutas/T4.png"]
    },
    {
        sequence: ["./IMG/Frutas/F2.png", "./IMG/Frutas/T1.png", "./IMG/Frutas/T4.png", "./IMG/Frutas/Pe3.png","./IMG/Frutas/F2.png", "pregunta.png"],
        answer: "./IMG/Frutas/T1.png",
        possibleAnswers: ["./IMG/Frutas/F1.png", "./IMG/Frutas/F2.png", "./IMG/Frutas/F3.png", "./IMG/Frutas/F4.png", 
            "./IMG/Frutas/T2.png", "./IMG/Frutas/T3.png", "./IMG/Frutas/T4.png"]
    },
    {
        sequence: ["./IMG/Frutas/M1.png", "./IMG/Frutas/N2.png", "./IMG/Frutas/M3.png", "./IMG/Frutas/N4.png","./IMG/Frutas/M1.png", "pregunta.png"],
        answer: "./IMG/Frutas/N2.png",
        possibleAnswers: ["./IMG/Frutas/M1.png", "./IMG/Frutas/M2.png", "./IMG/Frutas/M3.png", "./IMG/Frutas/N1.png", 
            "./IMG/Frutas/N3.png", "./IMG/Frutas/N4.png", "./IMG/Frutas/M4.png"]
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

    
    
    // Función para clasificar una imagen como horizontal o vertical
    function clasificarImagen(img) {
        img.classList.remove("horizontal", "vertical"); // Limpia clases previas
        if (img.naturalHeight > img.naturalWidth) {
            img.classList.add("vertical");
        } else {
            img.classList.add("horizontal");
        }
    }

    // Función para procesar varias imágenes al mismo tiempo
    function procesarImagenes(selector) {
        const imgs = document.querySelectorAll(selector);
        imgs.forEach(img => {
            if (img.complete) {
                clasificarImagen(img);
            } else {
                img.addEventListener('load', () => clasificarImagen(img));
            }
        });
    }

 
    const options2 = generateOptions(level);
    options2.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-button");
        
        const imgOption = document.createElement("img");
        imgOption.src = option;
        imgOption.classList.add("option-image");
        
        button.appendChild(imgOption);
        button.onclick = (event) => checkAnswer(option, level.answer, event);
        optionsContainer.appendChild(button);
    });

    procesarImagenes("#options-container2 img");
    procesarImagenes("#game-container img");

    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('feedback').textContent = '';
    document.getElementById('restart').style.display = 'none';
}

function generateOptions(level) {
    let availableAnswers = level.possibleAnswers.filter(answer => answer !== level.answer);
    let shuffledIncorrect = availableAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
    let options2 = [level.answer, ...shuffledIncorrect];
    return options2.sort(() => Math.random() - 0.5);
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
