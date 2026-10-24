const btnUbicacion = document.getElementById("btn-ubicacion");
const msjUbicacion = document.getElementById("ubicacion-mensaje");
const mapaRuta = document.getElementById("mapa-ruta");

const latSucursal = 29.0729; // Coordenadas Hermosillo
const lonSucursal = -110.9559;
let mapa = null; // Previene error si el usuario da clic dos veces

btnUbicacion.addEventListener("click", () => {
    if (!navigator.geolocation) {
        msjUbicacion.textContent = "Tu navegador no soporta ubicación.";
        return;
    }
    msjUbicacion.textContent = "Buscando tu ubicación y calculando ruta...";
    navigator.geolocation.getCurrentPosition(
        (posicion) => mostrarRuta(posicion.coords.latitude, posicion.coords.longitude),
        () => msjUbicacion.textContent = "No se pudo obtener tu ubicación."
    );
});

function mostrarRuta(latCliente, lonCliente) {
    msjUbicacion.textContent = "Ruta trazada lista.";
    mapaRuta.hidden = false;

    if (!mapa) {
        mapa = L.map("mapa-ruta").setView([latCliente, lonCliente], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);
    }

    // Trazador de ruta
    L.Routing.control({
        waypoints: [
            L.latLng(latCliente, lonCliente), // Tú
            L.latLng(latSucursal, lonSucursal) // Tacos el Güero
        ],
        lineOptions: {
            styles: [{ color: '#DC2626', opacity: 0.9, weight: 6 }] // Línea roja
        },
        createMarker: function(i, wp) {
            return L.marker(wp.latLng).bindPopup(i === 0 ? "Tú estás aquí" : "Tacos el Güero");
        },
        show: false, // Oculta las instrucciones de texto
        addWaypoints: false 
    }).addTo(mapa);
}