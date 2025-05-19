let mistakes = 0;
const maxMistakes = 2; 

const levels = [
    {
        sequence: ["./IMG/Hojas/hoja5.png", "./IMG/Hojas/hoja1.png", "./IMG/Hojas/hoja4.png", "./IMG/Hojas/hoja7.png", "./IMG/Hojas/hoja5.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja1.png"
    },
    {
        sequence: ["./IMG/Hojas/hoja6.png", "./IMG/Hojas/hoja5.png", "./IMG/Hojas/hoja7.png", "./IMG/Hojas/hoja3.png", "./IMG/Hojas/hoja6.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja5.png"
    },
    {
        sequence: ["./IMG/Hojas/hoja7.png", "./IMG/Hojas/hoja7.png", "./IMG/Hojas/hoja4.png", "./IMG/Hojas/hoja8.png", "./IMG/Hojas/hoja7.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja7.png"
    },
    {
        sequence: ["./IMG/Hojas/hoja2.png", "./IMG/Hojas/hoja4.png", "./IMG/Hojas/hoja1.png", "./IMG/Hojas/hoja1.png", "./IMG/Hojas/hoja2.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja4.png"
    },
    {
        sequence: ["./IMG/Hojas/hoja7.png", "./IMG/Hojas/hoja1.png", "./IMG/Hojas/hoja5.png", "./IMG/Hojas/hoja4.png", "./IMG/Hojas/hoja3.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja1.png"
    },
    {
        sequence: ["./IMG/Hojas/hoja8.png", "./IMG/Hojas/hoja6.png", "./IMG/Hojas/hoja5.png", "./IMG/Hojas/hoja4.png", "./IMG/Hojas/hoja1.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja2.png"
    },
    {
        sequence: ["./IMG/Hojas/hoja3.png", "./IMG/Hojas/hoja4.png", "./IMG/Hojas/hoja2.png", "./IMG/Hojas/hoja1.png", "./IMG/Hojas/hoja7.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja4.png"
    },
    {
        sequence: ["./IMG/Hojas/hoja7.png", "./IMG/Hojas/hoja3.png", "./IMG/Hojas/hoja2.png", "./IMG/Hojas/hoja3.png", "./IMG/Hojas/hoja7.png", "pregunta.png"],
        answer: "./IMG/Hojas/hoja5.png"
    }
];

// Obtiene el nivel de la URL
const urlParams = new URLSearchParams(window.location.search);
const nivel = parseInt(urlParams.get("nivel")) || 1;

// Llama a la función para iniciar el juego con el nivel correcto
startGame(nivel);

function startGame(levelIndex) {
    const gameContainer = document.getElementById("game-container");
    const optionsContainer = document.getElementById("options-container2");
    const levelTitle = document.getElementById("level-title");

    gameContainer.innerHTML = "";
    optionsContainer.innerHTML = "";

    if (levelIndex < 1 || levelIndex > levels.length) {
        levelTitle.textContent = "Nivel no disponible";
        return;
    }

    const level = levels[levelIndex - 1];
    levelTitle.textContent = `Nivel ${levelIndex}`;

    // Mostrar la secuencia de imágenes
    level.sequence.forEach((imgSrc, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.classList.add("sequence-image");
        gameContainer.appendChild(imgElement);
    });

    // Generar opciones de respuesta con imágenes
    const options = generateOptions(level.answer);
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

function generateOptions(correctAnswer) {
    const possibleAnswers = ["./IMG/Hojas/hoja1.png", "./IMG/Hojas/hoja2.png", "./IMG/Hojas/hoja3.png", "./IMG/Hojas/hoja4.png", "./IMG/Hojas/hoja5.png", "./IMG/Hojas/hoja6.png", "./IMG/Hojas/hoja7.png", "./IMG/Hojas/hoja8.png"];
    // Filtrar para evitar que la respuesta correcta se repita
    let availableAnswers = possibleAnswers.filter(answer => answer !== correctAnswer);

    // Mezclar las respuestas incorrectas y tomar las primeras 3
    let shuffledIncorrect = availableAnswers.sort(() => Math.random() - 0.5).slice(0, 3);

    // Agregar la respuesta correcta
    let options = [correctAnswer, ...shuffledIncorrect];

    // Mezclar nuevamente las opciones finales
    return options.sort(() => Math.random() - 0.5);
}

function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        scalar: 2.0 //Tamaño del confeti
    });
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
            
            
            document.getElementById('options-container2').style.display = 'none'; // Oculta las opciones despues de perder
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
    document.getElementById('contador-intentos').textContent = mistakes;
    
    document.getElementById('window-notice').style.display = 'none';
    document.getElementById('window-notice2').style.display = 'none';// Ocultar ventana emergente
    document.getElementById('options-container2').style.display = 'flex';// Mostrar opciones nuevamente
    document.getElementById('feedback').textContent = ''; // Limpiar mensaje de feedback
    loadLevel(); // Reiniciar el nivel actual
}


function nextLevel() {
    let urlParams = new URLSearchParams(window.location.search);
    let nivelActual = parseInt(urlParams.get("nivel")) || 1;
    let nuevoNivel = nivelActual + 1;

    if (nuevoNivel <= levels.length) {
        window.location.href = `?nivel=${nuevoNivel}`;
    } else {
        document.getElementById('feedback').textContent = '¡Has completado todos los niveles!';
    }
}
