# Tacos El Güero Cruz — PWA de ventas

| Dato | Valor |
|---|---|
| **Alumno** | CRUZ SANDOVAL GUILLERMO ESTEBAN |
| **Grupo** | ING10-1 |
| **Negocio · giro** | Tacos El Güero Cruz · Taquería estilo sonorense|
| **URL del repositorio** | https://github.com/cruzsandovalguillermoesteban/tacos-el-guero-cruz-pwa-cruz-sandoval-guillermo-esteban|
| **URL de GitHub Pages** | https://cruzsandovalguillermoesteban.github.io/tacos-el-guero-cruz-pwa-cruz-sandoval-guillermo-esteban/ |

## Historial de avances

| Avance | Hash del commit entregado | Fecha |
|---|---|---|
| 1 | e7f96a1 | 10/10/2026 |
| 2 | 817ec7d | 18/10/2026 |
| 3 | be0ad97 | 18/10/2026 |
## Comparación SSR vs CSR

### SSR (Django): los productos llegan escritos en el HTML
![Código fuente SSR](docs/captura-ssr.png)

### CSR (JavaScript): el div del catálogo llega vacío
![Código fuente CSR](docs/captura-csr.png)

## Funciones PWA avance 3
### index.html: manifest y registro del Service Worker activos
![Código fuente index.html](docs/captura-index-pwa.png)

### sw.js: Workbox precachea el catálogo y las fotos
![Código fuente sw.js](docs/captura-sw.png)

## Versión Publica (avance 4)
### Index.html en Github Pages
![Código fuente index.html](docs/captura-pages-index.png)

### Manifest.Json en Github Pages
![Código fuente manifest.json](docs/captura-pages-manifest.png)

### App instalada en el celular
![Código fuente manifest.json](docs/captura-celular.png)


## Guía de Instalación y Uso — Tacos el Güero Cruz PWA

### Requisitos previos
* Dispositivo móvil (Android con Chrome o iOS con Safari) o computadora con navegador moderno.
* Conexión a internet para la primera carga.

### Pasos para instalar en Celular (Android / Chrome)
1. Abre el navegador Chrome e ingresa a la URL: `https://cruzsandovalguillermoesteban.github.io/tacos-el-guero-cruz-pwa-cruz-sandoval-guillermo-esteban/`
2. Despliega el menú de opciones (tres puntos superiores).
3. Selecciona "Instalar aplicación" o "Agregar a la pantalla principal".
4. Confirma la instalación. El ícono de Tacos el Güero Cruz aparecerá en tu menú de aplicaciones.

### Pasos para instalar en Celular (iPhone / Safari)
1. Abre Safari e ingresa a la URL del proyecto.
2. Toca el botón de Compartir (cuadro con flecha hacia arriba).
3. Selecciona la opción "Agregar al inicio".

### Uso Offline
Una vez instalada, la app cacheará el catálogo y los recursos mediante el Service Worker generado con Workbox. Podrás abrirla directamente desde el ícono en tu pantalla de inicio incluso sin conexión a internet.