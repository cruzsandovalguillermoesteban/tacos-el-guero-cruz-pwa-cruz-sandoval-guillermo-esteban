const estadoConexion = document.getElementById("estado-conexion");
const btnSincronizar = document.getElementById("btn-sincronizar");
const mensajeCarrito = document.getElementById("carrito-mensaje");

function actualizarEstado() {
    if (navigator.onLine) {
        estadoConexion.textContent = "conectado";
        estadoConexion.classList.remove("sin-conexion");
        if (localStorage.getItem("carrito") && localStorage.getItem("carrito") !== "[]") {
            sincronizarPedido();
        }
    } else {
        estadoConexion.textContent = "sin conexión";
        estadoConexion.classList.add("sin-conexion");
    }
}

function sincronizarPedido() {
    if (!navigator.onLine) {
        mensajeCarrito.textContent = "Offline. Se sincronizará al reconectar.";
        return;
    }
    mensajeCarrito.textContent = "Sincronizando con el servidor...";
    setTimeout(() => {
        mensajeCarrito.textContent = "¡Pedido sincronizado con éxito!";
        localStorage.setItem("carrito", "[]"); 
        document.getElementById("carrito-lista").innerHTML = "";
        document.getElementById("carrito-total").textContent = "0";
        if (typeof lanzarNotificacion === "function") lanzarNotificacion("¡Tu pedido está en camino!");
    }, 1500);
}

window.addEventListener("online", actualizarEstado);
window.addEventListener("offline", actualizarEstado);
btnSincronizar.addEventListener("click", sincronizarPedido);
actualizarEstado();