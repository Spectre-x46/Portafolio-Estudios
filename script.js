// --- 1. Gestión de Bienvenida Inteligente ---
function mostrarBienvenida() {
    // Comprobamos si ya saludamos al usuario en esta sesión para no ser pesados
    const yaSaludado = sessionStorage.getItem("bienvenida_mostrada");

    if (!yaSaludado) {
        const nombre = prompt("¿Cómo te llamas?");
        if (nombre) {
            alert("¡Hola " + nombre + "! Gracias por visitarme.Ahora iras directamente al formulario.");
            sessionStorage.setItem("bienvenida_mostrada", "true");
            console.log("Visitante identificado: " + nombre);
        }
    }
    // Si ya fue saludado, el enlace simplemente lo lleva al ancla #contacto sin molestar
}

// --- 2. Contador de Visitas con Reflejo en Pantalla ---
let visitas = localStorage.getItem("visitas") || 0;
visitas++;
localStorage.setItem("visitas", visitas);

// Mostramos las visitas en el nuevo span del footer
const uiContador = document.getElementById("contador-ui");
if (uiContador) {
    uiContador.textContent = "Visitas: " + visitas;
}

// --- 3. Reloj en Tiempo Real Optimizado ---
function actualizarReloj() {
    const ahora = new Date();
    // Usamos un formato de 24h más técnico
    const opciones = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const tiempoEstilizado = ahora.toLocaleTimeString('es-ES', opciones);
    
    const divReloj = document.getElementById("reloj");
    if (divReloj) {
        divReloj.textContent = "Sistema Online: " + tiempoEstilizado;
    }
}

// Intervalo de actualización
setInterval(actualizarReloj, 1000);
actualizarReloj();