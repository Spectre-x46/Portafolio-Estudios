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

// --- CLASE 11: Lógica de Temas Simplificada ---
function cambiarTema() {
    const body = document.body;
    const btn = document.getElementById("btnTema");
    
    // El método toggle agrega la clase si no está, y la quita si ya está
    body.classList.toggle("modo-claro");
    
    // Verificamos si ahora tiene la clase para cambiar el texto del botón
    if (body.classList.contains("modo-claro")) {
        btn.textContent = "☀️ MODO CLARO";
    } else {
        btn.textContent = "🌙 MODO OSCURO";
    }
}

// Escuchamos cuando haces clic en el botón
document.getElementById("btnTema").addEventListener("click", cambiarTema);

// 1. Definimos las reglas (Plantillas de seguridad)
const REGLAS = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Solo letras y espacios, min 3
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Formato correo
};

// 2. Capturamos los elementos usando data-js (Como en tu clase)
const formulario = document.getElementById('formulario-contacto');
const nombreInput = document.querySelector('[data-js="nombre-input"]');
const emailInput = document.querySelector('[data-js="email-input"]');

// Los spans donde irán los mensajes
const nombreError = document.querySelector('[data-js="nombre-error"]');
const emailError = document.querySelector('[data-js="email-error"]');

// 3. Función para mostrar/ocultar el error (Reutilizable)
const mostrarError = (span, mensaje, esInvalido) => {
    if (esInvalido) {
        span.textContent = mensaje;
        span.style.display = 'block';
    } else {
        span.textContent = '';
        span.style.display = 'none';
    }
};

// 4. El proceso de envío (Versión Profesional)
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // ¡Freno de mano! Evita que la página se recargue

    // Validamos cada campo usando las REGLAS que definimos arriba
    const nombreInvalido = !REGLAS.nombre.test(nombreInput.value.trim());
    const emailInvalido = !REGLAS.email.test(emailInput.value.trim());

    // Mostramos u ocultamos los errores rojos según corresponda
    mostrarError(nombreError, "⚠️ El nombre debe tener al menos 3 letras.", nombreInvalido);
    mostrarError(emailError, "⚠️ Ingresa un correo válido (ejemplo@correo.com).", emailInvalido);

    // Solo si AMBOS son válidos (! significa 'no es inválido')
    if (!nombreInvalido && !emailInvalido) {
        // 1. Mostramos el mensaje de éxito en la pantalla
        const exito = document.getElementById('mensaje-exito');
        exito.style.display = 'block';

        // 2. Limpiamos el formulario para que el usuario vea que terminó
        formulario.reset();

        // 3. Opcional: Ocultamos el mensaje después de 5 segundos
        setTimeout(() => {
            exito.style.display = 'none';
        }, 5000);

        console.log("Formulario validado y procesado localmente ✅");
    }
});