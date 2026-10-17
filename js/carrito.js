// js/carrito.js — Almacenamiento local y sincronización
const CLAVE_CARRITO = "tacos-guero-carrito";

function leerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : []; 
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Esta función es llamada desde csr.js cuando oprimes "Agregar al carrito"
function agregarAlCarrito(producto) {
  const carrito = leerCarrito();
  // Usamos == por si el ID en el HTML es texto y en el JSON es número
  const existente = carrito.find((item) => item.id == producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
  }

  guardarCarrito(carrito);
  pintarCarrito();
}

function cambiarCantidad(id, delta) {
  const carrito = leerCarrito();
  const item = carrito.find((item) => item.id == id);
  if (!item) return;

  item.cantidad += delta;
  const actualizado = item.cantidad <= 0 ? carrito.filter((item) => item.id != id) : carrito;

  guardarCarrito(actualizado);
  pintarCarrito();
}

function quitarDelCarrito(id) {
  const carrito = leerCarrito().filter((item) => item.id != id);
  guardarCarrito(carrito);
  pintarCarrito();
}

function pintarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("carrito-total");
  
  if (!lista || !total) return; // Si no existe el HTML, no hace nada

  const carrito = leerCarrito();
  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    suma += subtotal;

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "10px";
    li.style.borderBottom = "1px solid #ddd";
    li.style.paddingBottom = "5px";

    li.innerHTML = `
      <span class="carrito-nombre" style="flex: 1;">
        <strong>${item.nombre}</strong><br>
        <small>$${item.precio} c/u</small>
      </span>
      <span class="carrito-cantidad" style="margin: 0 10px;">
        <button type="button" data-accion="restar" data-id="${item.id}" style="padding: 2px 8px;">−</button>
        <span class="carrito-cantidad__valor" style="margin: 0 5px;">${item.cantidad}</span>
        <button type="button" data-accion="sumar" data-id="${item.id}" style="padding: 2px 8px;">+</button>
      </span>
      <span class="carrito-precio" style="font-weight: bold; width: 60px; text-align: right;">$${subtotal}</span>
      <button type="button" class="carrito-quitar" data-accion="quitar" data-id="${item.id}" style="margin-left: 10px; background: #DC2626; color: white; border: none; padding: 5px; border-radius: 4px;">🗑️</button>
    `;
    lista.appendChild(li);
  });

  total.textContent = suma;
}

function manejarClicCarrito(evento) {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;

  const id = boton.dataset.id; // Dejamos el ID como texto
  if (boton.dataset.accion === "sumar") cambiarCantidad(id, 1);
  if (boton.dataset.accion === "restar") cambiarCantidad(id, -1);
  if (boton.dataset.accion === "quitar") quitarDelCarrito(id);
}

function sincronizarCarrito() {
  const mensaje = document.getElementById("carrito-mensaje");
  if (!mensaje) return;

  if (!navigator.onLine) {
    mensaje.textContent = "Sin conexión: el carrito se sincronizará cuando vuelva el internet. 🕒";
    return;
  }
  mensaje.textContent = "Carrito sincronizado con el servidor (simulado). ✓";
}

document.addEventListener("DOMContentLoaded", () => {
  pintarCarrito();
  
  const lista = document.getElementById("carrito-lista");
  if(lista) lista.addEventListener("click", manejarClicCarrito);
  
  const btnSincronizar = document.getElementById("btn-sincronizar");
  if(btnSincronizar) btnSincronizar.addEventListener("click", sincronizarCarrito);

  window.addEventListener("online", sincronizarCarrito);
  window.addEventListener("offline", () => {
    const mensaje = document.getElementById("carrito-mensaje");
    if(mensaje) mensaje.textContent = "Se perdió la conexión. 🔴";
  });
});