document.addEventListener("DOMContentLoaded", () => {
  const nivel = localStorage.getItem("nivelCompleto") || "un nivel";
  const mensaje = document.querySelector("#mensaje");
  const btnSiguiente = document.querySelector("#btn-siguiente");
  const btnRepetir = document.querySelector("#btn-repetir");

  mensaje.textContent = `¡Felicidades! Has completado ${nivel} 🎉`;

  let rutaNivel = "index.html";

  if (nivel === "el nivel de figuras") {
    btnSiguiente.href = "nivel-numeros.html";
    rutaNivel = "nivel-figuras.html";
  } else if (nivel === "el nivel de números") {
    btnSiguiente.href = "nivel-letras.html";
    rutaNivel = "nivel-numeros.html";
  } else if (nivel === "el nivel de letras") {
    btnSiguiente.href = "aleatorio.html";
    rutaNivel = "nivel-letras.html";
  } else if (nivel === "el nivel aleatorio") {
    btnSiguiente.style.display = "none"; // último nivel
    rutaNivel = "aleatorio.html";
  }

  btnRepetir.href = rutaNivel;
});
