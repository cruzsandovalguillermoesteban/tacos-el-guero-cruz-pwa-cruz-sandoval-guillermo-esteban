from django.shortcuts import render

# "Base de datos" falsa: una lista de diccionarios en memoria.
# En un proyecto real esto vendría de un modelo (models.py) y una tabla,
# pero para ENTENDER qué es SSR no necesitamos base de datos: lo importante
# es que estos datos se insertan en el HTML *antes* de enviarlo al navegador.
PRODUCTOS = [
    # Categoría 1: Tacos
    {"id": "t1", "nombre": "Taco de Asada", "precio": 35, "categoria": "Tacos", "imagen": "img/taco-asada.jpg"},
    {"id": "t2", "nombre": "Taco de Tripa", "precio": 40, "categoria": "Tacos", "imagen": "img/taco-tripa.jpg"},
    {"id": "t3", "nombre": "Taco de Pastor", "precio": 30, "categoria": "Tacos", "imagen": "img/taco-pastor.jpg"},
    {"id": "t4", "nombre": "Taco de Cabeza", "precio": 35, "categoria": "Tacos", "imagen": "img/taco-cabeza.jpg"},
    {"id": "t5", "nombre": "Taco de Suadero", "precio": 35, "categoria": "Tacos", "imagen": "img/taco-suadero.jpg"},
    
    # Categoría 2: Especialidades
    {"id": "e1", "nombre": "Quesadilla de Asada", "precio": 65, "categoria": "Especialidades", "imagen": "img/quesadilla.jpg"},
    {"id": "e2", "nombre": "Caramelo", "precio": 75, "categoria": "Especialidades", "imagen": "img/caramelo.jpg"},
    {"id": "e3", "nombre": "Lorenza", "precio": 70, "categoria": "Especialidades", "imagen": "img/lorenza.jpg"},
    {"id": "e4", "nombre": "Pellizcada", "precio": 50, "categoria": "Especialidades", "imagen": "img/pellizcada.jpg"},
    {"id": "e5", "nombre": "Burrito Percherón", "precio": 120, "categoria": "Especialidades", "imagen": "img/burrito.jpg"},
    
    # Categoría 3: Bebidas
    {"id": "b1", "nombre": "Agua de Horchata", "precio": 25, "categoria": "Bebidas", "imagen": "img/horchata.jpg"},
    {"id": "b2", "nombre": "Agua de Jamaica", "precio": 25, "categoria": "Bebidas", "imagen": "img/jamaica.jpg"},
    {"id": "b3", "nombre": "Agua de Cebada", "precio": 25, "categoria": "Bebidas", "imagen": "img/cebada.jpg"},
    {"id": "b4", "nombre": "Refresco de Cola", "precio": 30, "categoria": "Bebidas", "imagen": "img/refresco.jpg"},
    {"id": "b5", "nombre": "Agua Natural", "precio": 20, "categoria": "Bebidas", "imagen": "img/agua.jpg"},
]
def vista_ssr(request):
    """
    Vista con Renderizado en Servidor (SSR).

    request: el objeto que representa la petición que hizo el navegador.

    render() hace tres cosas:
    1) toma la plantilla 'catalogo/catalogo_ssr.html'
    2) le inyecta el diccionario de "contexto" (aquí: la lista de productos)
    3) devuelve el HTML final, YA CON LOS DATOS DENTRO, listo para el navegador.

    Por eso es "servidor": el HTML que llega al navegador ya trae escritos
    los nombres y precios. Si haces clic derecho > "Ver código fuente de la
    página" verás los productos en el HTML, aunque JavaScript esté desactivado.
    Compáralo con la vista CSR de la Parte B, donde el HTML llega vacío y es
    JavaScript quien dibuja los productos DESPUÉS, ya en el navegador.
    """
    contexto = {"productos": PRODUCTOS}
    return render(request, 'catalogo/catalogo_ssr.html', contexto)