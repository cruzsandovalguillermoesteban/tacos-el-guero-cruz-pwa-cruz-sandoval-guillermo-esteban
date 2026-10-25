// js/notificaciones.js — Notification API para Tacos el Güero Cruz

// Función global que puede ser llamada desde carrito.js
function lanzarNotificacion(textoMensaje) {
  if (!("Notification" in window)) return;
  
  if (Notification.permission === "granted") {
    new Notification("Tacos el Güero Cruz", {
      body: textoMensaje,
      icon: "img/tacos.png",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-notificar");
  const mensaje = document.getElementById("notificaciones-mensaje");

  if (boton) {
    boton.addEventListener("click", () => {
      // Comprobamos si el navegador soporta las notificaciones
      if (!("Notification" in window)) {
        mensaje.textContent = "Este navegador no soporta notificaciones.";
        return;
      }

      // Pedimos permiso al usuario
      Notification.requestPermission().then((permiso) => {
        if (permiso === "granted") {
          lanzarNotificacion("¡Listo, pariente! Te avisaremos cuando tu pedido esté en camino.");
          mensaje.textContent = "Notificaciones activadas con éxito.";
        } else {
          mensaje.textContent = "No diste permiso para las notificaciones.";
        }
      });
    });
  }
});