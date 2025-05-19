function moverImagenes() {
    const imagenes = document.querySelectorAll("#game-container img");

    imagenes.forEach(img => {
        let randomX = (Math.random() - 0.5) * 5; // Movimiento aleatorio en X
        let randomY = (Math.random() - 0.5) * 5; // Movimiento aleatorio en Y

        img.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// Mueve las imágenes cada 500ms
setInterval(moverImagenes, 2000);