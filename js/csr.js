// Variable global para guardar todos los productos y no descargarlos a cada rato
let todosLosProductos = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarCatalogo();
  configurarFiltros();
});

function cargarCatalogo() {
  // Ahora apunta correctamente a tu catalogo.json
  fetch("catalogo.json") 
    .then((respuesta) => {
        if (!respuesta.ok) throw new Error("Error en la red");
        return respuesta.json();
    }) 
    .then((productos) => {
        todosLosProductos = productos;
        // Mandamos a dibujar todos la primera vez
        pintarCatalogo(todosLosProductos); 
    })
    .catch((error) => {
        const contenedorCatalogo = document.getElementById("catalogo");
        contenedorCatalogo.innerHTML = "<p style='color:red;'>No se pudo cargar el menú. Verifica tu archivo catalogo.json.</p>";
        contenedorCatalogo.removeAttribute("aria-busy");
        contenedorCatalogo.removeAttribute("aria-label");
        console.error("Error al cargar el catálogo:", error);
    });
}

// Aquí está TODA tu lógica de agrupado por categorías
function pintarCatalogo(productosAPintar) {
    const contenedorCatalogo = document.getElementById("catalogo");

    // Limpiamos el contenedor y atributos
    contenedorCatalogo.innerHTML = "";
    contenedorCatalogo.removeAttribute("aria-busy");
    contenedorCatalogo.removeAttribute("aria-label");
    // Quitamos la clase grid general para ponerla dentro de cada categoría
    contenedorCatalogo.classList.remove("grid");

    // 1. Agrupamos los productos por su categoría
    const productosAgrupados = {};
    productosAPintar.forEach((producto) => {
        if (!productosAgrupados[producto.categoria]) {
            productosAgrupados[producto.categoria] = [];
        }
        productosAgrupados[producto.categoria].push(producto);
    });

    // 2. Dibujamos cada categoría con sus productos
    for (const nombreCategoria in productosAgrupados) {
        
        // Creamos el título de la categoría
        const titulo = document.createElement("h3");
        titulo.textContent = nombreCategoria;
        titulo.style.color = "#DC2626"; 
        titulo.style.borderBottom = "2px solid #DC2626"; 
        titulo.style.marginTop = "2rem"; 
        titulo.style.paddingBottom = "5px";
        contenedorCatalogo.appendChild(titulo);

        // Creamos la cuadrícula para esta categoría específica
        const gridCategoria = document.createElement("div");
        gridCategoria.className = "grid";

        // Agregamos las tarjetas de producto
        productosAgrupados[nombreCategoria].forEach((producto) => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "producto";

            tarjeta.innerHTML = `
                <img class="producto__foto" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" onerror="this.src='img/placeholder.png'">
                <strong>${producto.nombre}</strong>
                <span class="precio">$${producto.precio}</span>
                <button type="button" data-id="${producto.id}" style="margin-top: 10px; width: 100%;">Agregar al carrito</button>
            `;

            gridCategoria.appendChild(tarjeta);

            // Conectamos el botón al carrito.js
            tarjeta.querySelector("button").addEventListener("click", () => {
                if (typeof agregarAlCarrito === "function") {
                    agregarAlCarrito(producto);
                } else {
                    alert(`¡${producto.nombre} agregado!\n(Asegúrate de que carrito.js esté vinculado)`);
                }
            });
        });

        contenedorCatalogo.appendChild(gridCategoria);
    }
}

// Configuración de los botones de filtro tipo píldora
function configurarFiltros() {
  const botonesFiltro = document.querySelectorAll(".btn-filtro");
  
  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", (e) => {
      // Cambiamos la clase visual 'activo' al botón presionado
      botonesFiltro.forEach(b => b.classList.remove("activo"));
      e.target.classList.add("activo");

      // Filtramos el arreglo global
      const categoria = e.target.dataset.categoria;
      if (categoria === "Todos") {
        pintarCatalogo(todosLosProductos);
      } else {
        const filtrados = todosLosProductos.filter(prod => prod.categoria === categoria);
        pintarCatalogo(filtrados);
      }
    });
  });
}