// csr.js — Renderizado en el Cliente (CSR)
const contenedorCatalogo = document.getElementById("catalogo");

fetch("catalogo.json")
.then((respuesta) => respuesta.json()) 
.then((productos) => {
    // Limpiamos el contenedor y los atributos de carga
    contenedorCatalogo.innerHTML = "";
    contenedorCatalogo.removeAttribute("aria-busy");
    contenedorCatalogo.removeAttribute("aria-label");

    // IMPORTANTE: Le quitamos la clase "grid" al catálogo principal 
    // porque ahora crearemos una "grid" (cuadrícula) por cada categoría.
    contenedorCatalogo.classList.remove("grid");

    // 1. Agrupamos los productos por su categoría
    const productosAgrupados = {};
    productos.forEach((producto) => {
      // Si la categoría aún no existe en nuestro grupo, la creamos
    if (!productosAgrupados[producto.categoria]) {
        productosAgrupados[producto.categoria] = [];
    }
      // Metemos el producto en su categoría correspondiente
    productosAgrupados[producto.categoria].push(producto);
    });

    // 2. Dibujamos cada categoría con sus productos
    for (const nombreCategoria in productosAgrupados) {
    
      // Creamos un título (<h3>) para la categoría ("Tacos", "Bebidas", etc.)
    const titulo = document.createElement("h3");
    titulo.textContent = nombreCategoria;
      titulo.style.color = "#DC2626"; // Tu rojo de marca
      titulo.style.borderBottom = "2px solid #DC2626"; // Una línea bonita debajo
      titulo.style.marginTop = "2rem"; // Espacio para que no se amontone
    titulo.style.paddingBottom = "5px";
    contenedorCatalogo.appendChild(titulo);

      // Creamos un nuevo contenedor "grid" solo para los productos de esta categoría
    const gridCategoria = document.createElement("div");
    gridCategoria.className = "grid";

      // Recorremos los productos que pertenecen solo a esta categoría
    productosAgrupados[nombreCategoria].forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "producto";

        // Como ya los separamos por título, quitamos el texto de categoría de la tarjeta
        tarjeta.innerHTML = `
        <img class="producto__foto" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <strong>${producto.nombre}</strong>
        <span class="precio">$${producto.precio}</span>
        <button type="button" data-id="${producto.id}" style="margin-top: 10px; width: 100%;">Agregar al carrito</button>
        `;

        gridCategoria.appendChild(tarjeta);

        // Conectamos el botón al carrito
        tarjeta.querySelector("button").addEventListener("click", () => {
        if (typeof agregarAlCarrito === "function") {
            agregarAlCarrito(producto);
        } else {
            alert(`¡${producto.nombre} agregado!\n(Función disponible en el Avance 2)`);
        }
        });
    });

      // Insertamos toda esta sección al documento
    contenedorCatalogo.appendChild(gridCategoria);
    }
})
.catch((error) => {
    contenedorCatalogo.innerHTML = "<p>No se pudo cargar el menú. Intenta más tarde.</p>";
    contenedorCatalogo.removeAttribute("aria-busy");
    contenedorCatalogo.removeAttribute("aria-label");
    console.error("Error al cargar el catálogo:", error);
});