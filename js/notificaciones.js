document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-notificar");
  const mensaje = document.getElementById("notificaciones-mensaje");

  boton.addEventListener("click", () => {
    // Comprobamos si el navegador soporta las notificaciones
    if (!("Notification" in window)) {
      mensaje.textContent = "Este navegador no soporta notificaciones.";
      return;
    }

    // Pedimos permiso al usuario
    Notification.requestPermission().then((permiso) => {
      if (permiso === "granted") {
        // Notificación personalizada con los datos de tu negocio
        new Notification("Tacos el Güero Cruz", {
          body: "¡Listo, pariente! Te avisaremos cuando tu pedido esté en camino.",
          icon: "img/tacos.png",
        });
        mensaje.textContent = "Notificaciones activadas con éxito.";
      } else {
        mensaje.textContent = "No diste permiso para las notificaciones.";
      }
    });
  });
});