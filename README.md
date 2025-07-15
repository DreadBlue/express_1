Es un servidor web que permite reservar salas. Puedes ver qué salas hay, hacer reservas nuevas y cancelar reservas. Está hecho con Node.js sin usar Express.

server.js
Es el archivo principal. Arranca el servidor en el puerto 3000 y tiene un try-catch para manejar errores.

config.js
Aquí están todas las configuraciones como el puerto del servidor, rutas de archivos y mensajes de error.

router.js  
Recibe las peticiones HTTP y decide qué función debe ejecutarse según la URL. Usa if-else para cada ruta.

handlers.js
Tiene todas las funciones que ejecutarían las peticiones de los usuarios referente a las salas

utils.js
Funciones que uso en varios sitios como leer archivos JSON, escribir archivos y enviar respuestas.

Tecnologías usadas

- Node.js (JavaScript)
- Módulo HTTP nativo
- UUID para generar IDs únicos
- Archivos JSON para guardar datos

Cosas que se podrían mejorar

- Usar una base de datos real en vez de archivos JSON
- Agregar autenticación de usuarios
- Hacer tests
- Usar un framework como Express
