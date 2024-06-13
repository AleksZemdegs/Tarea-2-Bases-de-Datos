/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "descripcion_usuario" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Correo" (
    "id_correo" SERIAL NOT NULL,
    "id_remitente" INTEGER NOT NULL,
    "id_destinatario" INTEGER NOT NULL,
    "asunto" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    "es_favorito" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Correo_pkey" PRIMARY KEY ("id_correo")
);

-- CreateTable
CREATE TABLE "Bloqueados" (
    "id_user" INTEGER NOT NULL,
    "id_bloqueado" INTEGER NOT NULL,

    CONSTRAINT "Bloqueados_pkey" PRIMARY KEY ("id_user","id_bloqueado")
);

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_id_remitente_fkey" FOREIGN KEY ("id_remitente") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_id_destinatario_fkey" FOREIGN KEY ("id_destinatario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloqueados" ADD CONSTRAINT "Bloqueados_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bloqueados" ADD CONSTRAINT "Bloqueados_id_bloqueado_fkey" FOREIGN KEY ("id_bloqueado") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
