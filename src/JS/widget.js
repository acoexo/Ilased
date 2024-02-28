function mostrarReloj() {
    const fecha = new Date();
    const hora = formatearDigito(fecha.getHours());
    const minutos = formatearDigito(fecha.getMinutes());
    const segundos = formatearDigito(fecha.getSeconds());

    const tiempoActual = `${hora}:${minutos}:${segundos}`;

    // Insertar el tiempo en el contenedor del widget
    document.getElementById('widget-container').innerText = tiempoActual;

    // Actualizar cada segundo
    setTimeout(mostrarReloj, 1000);
}

// Función para formatear un dígito a dos dígitos agregando un cero si es necesario
function formatearDigito(digito) {
    return digito < 10 ? `0${digito}` : digito;
}

// Llamar a la función para iniciar el widget
mostrarReloj();