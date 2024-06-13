import { NotFoundError } from 'elysia';
import db from '../../db';
 
// /**
//  * Getting all posts
//  */
// export async function getPosts() {
//   try {
//     return await db.post.findMany({ orderBy: { createdAt: 'asc' } });
//   } catch (e: unknown) {
//     console.error(`Error getting posts: ${e}`);
//   }
// }
 
// /**
//  * Getting a post by ID
//  */
// export async function getPost(id: number) {
//   try {
//     const post = await db.post.findUnique({
//       where: { id },
//     });
 
//     if (!post) {
//       throw new NotFoundError('Post not found.');
//     }
 
//     return post;
//   } catch (e: unknown) {
//     console.error(`Error finding post: ${e}`);
//   }
// }

// /**
//  * Deleting a post
//  */
// export async function deletePost(options: { id: number }) {
//   try {
//     const { id } = options;
 
//     return await db.post.delete({
//       where: { id },
//     });
//   } catch (e: unknown) {
//     console.error(`Error deleting post: ${e}`);
//   }
// }

/*
  TO-DO:

  > GET    - Mostrar correos por destinatario              (GET Correos, destinatario == id_usuario)

  > PATCH  - Bloquear usuario                              (PATCH Bloqueados)
  > GET    - Mostrar usuarios bloqueados por otro usuario  (GET Bloqueados, id_usuario (que bloquea) == id_usuario)

  > PATCH  - Marcar correo como favorito                   (PATCH Correos)
  > PATCH  - Desmarcar correo como favorito                (PATCH Correos)
  > GET    - Mostrar correos favoritos                     (GET from Correos, es_favorito == 1)

  > PUSH   ! Enviar correo                                 (PUSH Correos)

  > PUSH   ! Crear usuario                                 (PUSH Usuario)
  > PATCH* - Actualizar info. de usuario                   (PATCH Usuario)
  > GET    ! Mostrar información de un usuario             (GET Usuario)
  > DELETE*! Borrar usuario                                (DELETE Usuario)

  *: No necesario.
  -: Sin hacer.
  !: Hecha.

*/

// REGISTRAR USUARIO - PUSH

/**
 * Creating a post
 
export async function createPost(options: { title: string; content: string }) {
  try {
    const { title, content } = options;
 
    return await db.post.create({ data: { title, content } });
  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
  }
}
  */

// export: Función se puede usar en otros módulos.
// async: Función es asincrónica, se puede usar 'await'.
export async function registrar_usuario(
  options: { nombre: string; correo: string; clave: string; descripcion: string}) {

  try {
    const { nombre, correo, clave, descripcion } = options;  // Object Destructuring, para uso más fácil.

    return await db.post.create({ data: { nombre, correo, clave, descripcion }});
  } catch (e: unknown) {
    console.error(`Error creando usuario: ${e}`);
  }
}

// MOSTRAR INFO DE UN USUARIO - GET

/*
 * Getting a post by ID

export async function getPost(id: number) {
  try {
    const post = await db.post.findUnique({
      where: { id },
    });
 
    if (!post) {
      throw new NotFoundError('Post not found.');
    }
 
    return post;
  } catch (e: unknown) {
    console.error(`Error finding post: ${e}`);
  }
}
  */

export async function get_usuario(correo: string) {
  try {
    const usuario = await db.post.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado.');
    }
    
    return usuario;
  } catch (e: unknown) {
    console.error(`Error encontrando usuario: ${e}`);
  }
}

// BORRAR USUARIO - DELETE

/**
 * Deleting a post
 
export async function deletePost(options: { id: number }) {
  try {
    const { id } = options;
 
    return await db.post.delete({
      where: { id },
    });
  } catch (e: unknown) {
    console.error(`Error deleting post: ${e}`);
  }
}
*/

export async function borrar_usuario(options: { id_usuario: number }) {
  try {
    const { id_usuario } = options;

    return await db.post.delete({
      where: { id_usuario },
    });
  } catch (e: unknown) {
    console.error(`Error borrando post: ${e}`);
  }
}

// ENVIAR CORREO - PUSH

/**
 * Creating a post
 
export async function createPost(options: { title: string; content: string }) {
  try {
    const { title, content } = options;
 
    return await db.post.create({ data: { title, content } });
  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
  }
}
  */

export async function enviar_correo(
  options: { id_remitente: number; id_destinatario: number; asunto: string; cuerpo: string}) {

  try {
    const { id_remitente, id_destinatario, asunto, cuerpo } = options;

    return await db.post.create({ data: { id_remitente, id_destinatario, asunto, cuerpo }});
  } catch (e: unknown) {
    console.error(`Error enviando correo: ${e}`);
  }
}

// MARCAR CORREO COMO FAVORITO - PATCH