Instrucciones de uso | Elysia, Bun y Prisma: Dependencias de la API.

1.- Instalar Elysia 
2.- Bun también, instrucciones en: https://bun.sh/
3.- Para instalar Prisma, iniciar el siguiente comando dentro de la carpeta /api/: bun add -d prisma

Instrucciones de uso | DOCKER: Dependencia de la API.

1.- Instalar Docker por medio de la página web: https://docs.docker.com/get-docker/
2.- Abrir Docker y correr el siguiente comando en la consola para crear el container dentro de la app: 
      docker run --name dev-postgres -p 5432:5432 -e POSTGRES_PASSWORD=<pass> -d postgres
    Recordar reemplazar el campo de '<pass>' con la contraseña de admin que el usuario tiene en Postgres.
3.- En el archivo dentro de /api/ llamado '.env' cambiar 'DATABASE_URL=postgresql://postgres:12345678@localhost:5432/postgres?schema=public',
    tal de que donde dice '12345678' por la contraseña de admin que el usuario tiene en Postgres.
4.- Para hacer una migración, correr el comando: bunx prisma migrate dev --name create-post-model

Instrucciones de uso | Swagger: Dependencia del cliente.

1.- Para instalar Swagger, correr el siguiente comando dentro de la terminal mientras se esté dentro de la carpeta
    de /api/: bun add @elysiajs/swagger

Instrucciones de uso | Cliente

1.- Instalar las dependencias con pip -r requirements.txt.
2.- Ejecutar el cliente con en la terminal con python main.py
3.- Ingresar correo y clave
4.- Usar las flechas del teclado y la tecla Enter para navegar en el menu de opciones.
