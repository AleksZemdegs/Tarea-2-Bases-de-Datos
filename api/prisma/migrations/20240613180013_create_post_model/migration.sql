/*
  Warnings:

  - The primary key for the `Bloqueados` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `Bloqueados` table. All the data in the column will be lost.
  - You are about to drop the column `es_favorito` on the `Correo` table. All the data in the column will be lost.
  - You are about to drop the column `contrasena` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion_usuario` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `id_usuario` to the `Bloqueados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clave` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bloqueados" DROP CONSTRAINT "Bloqueados_id_user_fkey";

-- AlterTable
ALTER TABLE "Bloqueados" DROP CONSTRAINT "Bloqueados_pkey",
DROP COLUMN "id_user",
ADD COLUMN     "id_usuario" INTEGER NOT NULL,
ADD CONSTRAINT "Bloqueados_pkey" PRIMARY KEY ("id_usuario", "id_bloqueado");

-- AlterTable
ALTER TABLE "Correo" DROP COLUMN "es_favorito";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "contrasena",
DROP COLUMN "descripcion_usuario",
ADD COLUMN     "clave" TEXT NOT NULL,
ADD COLUMN     "descripcion" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Correos_favoritos" (
    "id_usuario" INTEGER NOT NULL,
    "id_correo" INTEGER NOT NULL,

    CONSTRAINT "Correos_favoritos_pkey" PRIMARY KEY ("id_usuario","id_correo")
);

-- AddForeignKey
ALTER TABLE "Bloqueados" ADD CONSTRAINT "Bloqueados_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correos_favoritos" ADD CONSTRAINT "Correos_favoritos_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correos_favoritos" ADD CONSTRAINT "Correos_favoritos_id_correo_fkey" FOREIGN KEY ("id_correo") REFERENCES "Correo"("id_correo") ON DELETE RESTRICT ON UPDATE CASCADE;
