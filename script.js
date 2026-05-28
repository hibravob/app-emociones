// URL de tu Google Apps Script
const URL_GOOGLE_SHEETS = "https://script.google.com/macros/s/AKfycbzQQxh-mSxocVAp8DjAq4X8CdUSr0xgSe-JVHFw8WTO73B6TNISfLE-ryNkWovTcPOj6Q/exec";

// SECCIÓN 1: Procesar formulario HSE
document.getElementById("formulario-hse").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que la página recargue
    
    // Capturar datos
    const formulario = new FormData(this);
    let item1 = parseInt(formulario.get("item1"));
    let item2_original = parseInt(formulario.get("item2"));
    
    // Regla de inversión para ítems negativos (Ej. Ítem 2)
    let item2_invertido = 0;
    if (item2_original === 1) item2_invertido = 5;
    else if (item2_original === 2) item2_invertido = 4;
    else if (item2_original === 3) item2_invertido = 3;
    else if (item2_original === 4) item2_invertido = 2;
    else if (item2_original === 5) item2_invertido = 1;

    // Calcular puntaje de Autoconciencia (Sumando los ítems 1 al 6, aquí solo sumamos 2 por el ejemplo)
    let puntajeAutoconciencia = item1 + item2_invertido;
    
    document.getElementById("resultado-hse").classList.remove("oculto");
    document.getElementById("resultado-hse").innerHTML = `<p><strong>Puntaje Autoconciencia:</strong> ${puntajeAutoconciencia}. <br>Guardando respuestas en Google Sheets...</p>`;

    // Enviar a Google Sheets
    fetch(URL_GOOGLE_SHEETS, {
        method: "POST",
        mode: "no-cors", // Crucial para evitar errores de seguridad en el navegador
        body: formulario
    }).then(() => {
        alert("¡Tus respuestas se han guardado exitosamente!");
    }).catch(error => {
        alert("Hubo un error al guardar.");
    });
});

// SECCIÓN 2: Mostrar Técnicas de Regulación
function mostrarTecnica() {
    const emocion = document.getElementById("selector-emocion").value;
    const contenedor = document.getElementById("tecnica-regulacion");
    const titulo = document.getElementById("titulo-tecnica");
    const texto = document.getElementById("texto-tecnica");
    const animacionRespiracion = document.getElementById("animacion-respiracion");

    contenedor.classList.remove("oculto");
    animacionRespiracion.classList.add("oculto"); // Ocultar por defecto

    if (emocion === "furia") {
        titulo.innerText = "Propósito de la Furia y Técnica Sugerida";
        texto.innerText = "La furia tiene como propósito protegernos y defender nuestros límites. \n\nTécnica: Respiración 4-4-8. Sigue el círculo animado abajo.";
        animacionRespiracion.classList.remove("oculto");
    } else if (emocion === "tristeza") {
        titulo.innerText = "Propósito de la Tristeza y Técnica Sugerida";
        texto.innerText = "La tristeza nos ayuda a procesar pérdidas y buscar apoyo. \n\nTécnica: Pausa corporal. Tómate un vaso de agua o camina por 5 minutos.";
    } else {
        contenedor.classList.add("oculto");
    }
}