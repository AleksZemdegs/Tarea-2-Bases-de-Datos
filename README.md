Instrucciones de uso | DOCKER:

1.- Instalar Docker por medio de la página web: https://docs.docker.com/get-docker/
2.- Abrir Docker y correr el siguiente comando en la consola para crear el container dentro de la app: 
      docker run --name dev-postgres -p 5432:5432 -e POSTGRES_PASSWORD=<pass> -d postgres
    Recordar reemplazar el campo de '<pass>' con la contraseña de admin que el usuario tiene en Postgres.
3.- En el archivo dentro de /api/ llamado '.env' cambiar 'DATABASE_URL=postgresql://postgres:12345678@localhost:5432/postgres?schema=public',
    tal de que donde dice '12345678' por la contraseña de admin que el usuario tiene en Postgres.
4.- Para hacer una migración, correr el comando: bunx prisma migrate dev --name create-post-model
