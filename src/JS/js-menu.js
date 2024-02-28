let clics = 0;

    document.getElementById("logo").addEventListener("click", function() {
        let logo = document.getElementById("logo");

        let rotated = logo.getAttribute("data-rotated") === "true";
        logo.style.transition = "transform 1s ease";
        
        if (rotated) {
            logo.style.transform = "rotate(0deg)";
        } else {
            logo.style.transform = "rotate(180deg)";
            logo.style.transform = "rotate(360deg)";
        }

        logo.setAttribute("data-rotated", !rotated);

        // Incrementar el contador de clics
        clics++;

        // Redirigir a la página del juego oculto después del séptimo clic
        if (clics === 7) {
            window.location.href = "/Buscaminas/index.html";
        }
    });