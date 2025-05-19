let mistakes = 0;
const maxMistakes = 2; 

const levels = [
    {
        sequence: ["./IMG/Verano/Sombrillas/Som3.png", "./IMG/Verano/Sombrillas/Som5.png", "./IMG/Verano/Sombrillas/Som7.png", "./IMG/Verano/Sombrillas/Som1.png","./IMG/Verano/Sombrillas/Som7.png", "pregunta.png"],
        answer: "./IMG/Verano/Sombrillas/Som5.png",
        possibleAnswers: ["./IMG/Verano/Sombrillas/Som1.png", "./IMG/Verano/Sombrillas/Som2.png", "./IMG/Verano/Sombrillas/Som3.png", "./IMG/Verano/Sombrillas/Som4.png", 
            "./IMG/Verano/Sombrillas/Som6.png", "./IMG/Verano/Sombrillas/Som7.png", "./IMG/Verano/Sombrillas/Som8.png"]
    },
    {
        sequence: ["./IMG/Verano/Cubetas/cubeta1.png", "./IMG/Verano/Cubetas/cubeta4.png", "./IMG/Verano/Cubetas/cubeta7.png", "./IMG/Verano/Cubetas/cubeta2.png","./IMG/Verano/Cubetas/cubeta1.png", "pregunta.png"],
        answer: "./IMG/Verano/Cubetas/cubeta8.png",
        possibleAnswers: ["./IMG/Verano/Cubetas/cubeta1.png", "./IMG/Verano/Cubetas/cubeta2.png", "./IMG/Verano/Cubetas/cubeta3.png", "./IMG/Verano/Cubetas/cubeta4.png", 
            "./IMG/Verano/Cubetas/cubeta5.png", "./IMG/Verano/Cubetas/cubeta6.png", "./IMG/Verano/Cubetas/cubeta7.png"]
    },
    {
        sequence: ["./IMG/Verano/Tablas/tabla6.png", "./IMG/Verano/Tablas/tabla7.png", "./IMG/Verano/Tablas/tabla4.png", "./IMG/Verano/Tablas/tabla1.png","./IMG/Verano/Tablas/tabla6.png", "pregunta.png"],
        answer: "./IMG/Verano/Tablas/tabla7.png",
        possibleAnswers: ["./IMG/Verano/Tablas/tabla1.png", "./IMG/Verano/Tablas/tabla2.png", "./IMG/Verano/Tablas/tabla3.png", "./IMG/Verano/Tablas/tabla4.png", 
            "./IMG/Verano/Tablas/tabla5.png", "./IMG/Verano/Tablas/tabla6.png", "./IMG/Verano/Tablas/tabla8.png"]
    },
    {
        sequence: ["./IMG/Verano/Sol/Sol3.png", "./IMG/Verano/Sol/Sol8.png", "./IMG/Verano/Sol/Sol1.png", "./IMG/Verano/Sol/Sol6.png","./IMG/Verano/Sol/Sol3.png", "pregunta.png"],
        answer: "./IMG/Verano/Sol/Sol8.png",
        possibleAnswers: ["./IMG/Verano/Sol/Sol1.png", "./IMG/Verano/Sol/Sol2.png", "./IMG/Verano/Sol/Sol3.png", "./IMG/Verano/Sol/Sol4.png", 
            "./IMG/Verano/Sol/Sol5.png", "./IMG/Verano/Sol/Sol6.png", "./IMG/Verano/Sol/Sol7.png"]
    },
    {
        sequence: ["./IMG/Verano/Sombrillas/Som1.png", "./IMG/Verano/Sombrillas/Som8.png", "./IMG/Verano/Sombrillas/Som3.png", "./IMG/Verano/Sombrillas/Som6.png","./IMG/Verano/Sombrillas/Som1.png", "pregunta.png"],
        answer: "./IMG/Verano/Sombrillas/Som8.png",
        possibleAnswers: ["./IMG/Verano/Sombrillas/Som1.png", "./IMG/Verano/Sombrillas/Som2.png", "./IMG/Verano/Sombrillas/Som3.png", "./IMG/Verano/Sombrillas/Som4.png", 
            "./IMG/Verano/Sombrillas/Som5.png", "./IMG/Verano/Sombrillas/Som6.png", "./IMG/Verano/Sombrillas/Som7.png"]
    },
    {
        sequence: ["./IMG/Verano/Cubetas/cubeta8.png", "./IMG/Verano/Cubetas/cubeta7.png", "./IMG/Verano/Cubetas/cubeta2.png", "./IMG/Verano/Cubetas/cubeta5.png","./IMG/Verano/Cubetas/cubeta8.png", "pregunta.png"],
        answer: "./IMG/Verano/Cubetas/cubeta3.png",
        possibleAnswers: ["./IMG/Verano/Cubetas/cubeta1.png", "./IMG/Verano/Cubetas/cubeta2.png", "./IMG/Verano/Cubetas/cubeta4.png", "./IMG/Verano/Cubetas/cubeta5.png", 
            "./IMG/Verano/Cubetas/cubeta6.png", "./IMG/Verano/Cubetas/cubeta7.png", "./IMG/Verano/Cubetas/cubeta8.png"]
    },
    {
        sequence: ["./IMG/Verano/Tablas/tabla7.png", "./IMG/Verano/Tablas/tabla4.png", "./IMG/Verano/Tablas/tabla7.png", "./IMG/Verano/Tablas/tabla2.png","./IMG/Verano/Tablas/tabla1.png", "pregunta.png"],
        answer: "./IMG/Verano/Tablas/tabla8.png",
        possibleAnswers: ["./IMG/Verano/Tablas/tabla1.png", "./IMG/Verano/Tablas/tabla2.png", "./IMG/Verano/Tablas/tabla3.png", "./IMG/Verano/Tablas/tabla4.png", 
            "./IMG/Verano/Tablas/tabla5.png", "./IMG/Verano/Tablas/tabla6.png", "./IMG/Verano/Tablas/tabla7.png"]
    },
    {
        sequence: ["./IMG/Verano/Sol/Sol2.png", "./IMG/Verano/Sol/Sol7.png", "./IMG/Verano/Sol/Sol8.png", "./IMG/Verano/Sol/Sol1.png","./IMG/Verano/Sol/Sol6.png", "pregunta.png"],
        answer: "./IMG/Verano/Sol/Sol7.png",
        possibleAnswers: ["./IMG/Verano/Sol/Sol1.png", "./IMG/Verano/Sol/Sol2.png", "./IMG/Verano/Sol/Sol3.png", "./IMG/Verano/Sol/Sol4.png", 
            "./IMG/Verano/Sol/Sol5.png", "./IMG/Verano/Sol/Sol6.png", "./IMG/Verano/Sol/Sol8.png"]
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


    function clasificarImagen(img) {
        img.classList.remove("horizontal2", "vertical2"); // Limpia clases previas
        if (img.naturalHeight > img.naturalWidth) {
            img.classList.add("vertical2");
        } else {
            img.classList.add("horizontal2");
        }
    }

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

    procesarImagenes("#options-container2 img");
    procesarImagenes("#game-container img");

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
