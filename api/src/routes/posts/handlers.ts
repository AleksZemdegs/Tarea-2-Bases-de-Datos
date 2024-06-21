import { NotFoundError } from 'elysia';
import db from '../../db';

/*
  TO-DO:

  > GET*   - Mostrar correos por destinatario              (GET Correos, destinatario == id_usuario)

  > POST   ! Bloquear usuario                              (POST Bloqueados)
  > GET*   - Mostrar usuarios bloqueados por otro usuario  (GET Bloqueados, id_usuario (que bloquea) == id_usuario)

  > POST   ! Marcar correo como favorito                   (POST Correos_favoritos)
  > POST   ! Desmarcar correo como favorito                (POST Correos_Favoritos)
  > GET    ! Mostrar correos favoritos                     (GET Correos_favoritos, id_usuario == id)

  > POST   ! Enviar correo                                 (POST Correos)

  > POST   ! Crear usuario                                 (POST Usuario)
  > GET    ! Mostrar información de un usuario             (GET Usuario)
  > DELETE*! Borrar usuario                                (DELETE Usuario)

  *: No necesario.
  -: Sin hacer.
  !: Hecha.

*/
const crear_respuesta = (estado: number, mensaje: string, data?: any) => ({
  estado,
  mensaje,
  data,
});

const verificar_usuario = async (correo: string, clave: string) => {
  const usuario = await db.usuario.findUnique({
    where: { correo },
  });
  
  if (!usuario || usuario.clave !== clave) {
    throw new NotFoundError('Usuario no encontrado o clave incorrecta.');
  }

  return usuario.id_usuario;
};


// REGISTRAR USUARIO - POST
//
// Recibe un nombre, un correo, una descripcion y clave y genera
// un nuevo usuario con esos atributos en la DB

export async function registrar_usuario( // export: Función se puede usar en otros módulos. // async: Función es asincrónica, se puede usar 'await'.
  options: { nombre: string; correo: string; descripcion: string; clave: string; }) {

  try {
    const { nombre, correo, descripcion, clave} = options;  // Object Destructuring, para uso más fácil.

    const usuario = await db.usuario.create({ data: { nombre, correo, descripcion, clave }});
    return crear_respuesta(200, 'Usuario creado correctamente', usuario);
  } catch (e: unknown) {
    console.error(`Error creando usuario: ${e}`);
    return crear_respuesta(400, 'Hubo un error al crear el usuario');
  }
}

// MOSTRAR INFO DE UN USUARIO - GET
//
// Recibe un correo como input y busca a un usuario con dicho
// correo en la DB y lo retorna.

export async function get_usuario(correo: string) {
  try {
    const usuario = await db.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado.');
    }

    return crear_respuesta(200, 'Usuario encontrado exitosamente', usuario);
  } catch (e: unknown) {
    console.error(`Error encontrando usuario: ${e}`);
    return crear_respuesta(400, 'Hubo un error al encontrar el usuario');
  }
}

// BORRAR USUARIO - DELETE
//
// Borra un usuario. No usar.
// NO ESTÁ IMPLEMENTADO

export async function borrar_usuario(options: { id_usuario: number }) {
  try {
    const { id_usuario } = options;

    return await db.usuario.delete({
      where: { id_usuario },
    });
  } catch (e: unknown) {
    console.error(`Error borrando post: ${e}`);
  }
}

// ENVIAR CORREO - POST
//
// Recibe dos ids (remitente y destinatario), un asunto y cuerpo de
// correo como inputs y genera un correo en la DB con dichos
// atributos.

export async function enviar_correo(
  options: { id_remitente: number; id_destinatario: number; asunto: string; cuerpo: string }
) {
  try {
    const { id_remitente, id_destinatario, asunto, cuerpo } = options;

    const correo = await db.correo.create({ data: { id_remitente, id_destinatario, asunto, cuerpo }});
    return crear_respuesta(200, 'Correo enviado correctamente', correo);
  } catch (e: unknown) {
    console.error(`Error enviando correo: ${e}`);
    return crear_respuesta(400, 'Hubo un error al enviar el correo');
  }
}

// MARCAR CORREO COMO FAVORITO - POST
//
// Recibe dos IDs (correo y usuario) y genera una nueva entry
// en la DB con clave compuesta de ambos IDs

export async function marcar_correo(options: { id_usuario: number, id_correo: number }) {
  try {
    const { id_usuario, id_correo } = options;

    const correoFavorito = await db.correos_favoritos.create({ data: { id_usuario, id_correo }});
    return crear_respuesta(200, 'Correo marcado como favorito exitosamente', correoFavorito);
  } catch (e: unknown) {
    console.error(`Error marcando correo: ${e}`);
    return crear_respuesta(400, 'Hubo un error al marcar el correo como favorito');
  }
}

// DESMARCAR CORREO COMO FAVORITO - DELETE
//
// Recibe dos IDs (correo y usuario) y borra la entry de
// la DB que tenga a ambos parámetros como clave compuesta.

export async function desmarcar_correo(options: { id_usuario: number, id_correo: number }) {
  try {
    const { id_usuario, id_correo } = options;

    await db.correos_favoritos.delete({
      where: { 
        id_usuario_id_correo: {
          id_usuario, 
          id_correo, 
        } 
      },
    });
    return crear_respuesta(200, 'Correo desmarcado como favorito exitosamente');
  } catch (e: unknown) {
    console.error(`Error desmarcando correo: ${e}`);
    return crear_respuesta(400, 'Hubo un error al desmarcar el correo como favorito');
  }
}


// MOSTRAR CORREOS FAVORITOS - GET
//
// Recibe un ID de usuario como input y muestra todos
// los correos que tenga marcado como favoritos. Es decir,
// las entries que tengan su ID asociada.

export async function mostrar_favoritos(options: { id_usuario: number }) {
  try {
    const { id_usuario } = options;

    const favoritos = await db.correos_favoritos.findMany({
      where: { id_usuario }
    });
    return crear_respuesta(200, 'Correos favoritos mostrados correctamente', favoritos);
  } catch (e: unknown) {
    console.error(`Error al mostrar los correos favoritos: ${e}`);
    return crear_respuesta(400, 'Hubo un error al mostrar los correos favoritos');
  }
}

// BLOQUEAR USUARIO - POST
//
// Recibe dos IDs (correo y usuario) y genera una nueva entry
// en la DB con clave compuesta de ambos IDs.

export async function bloquear_usuario(options: { id_usuario: number, id_bloqueado: number }) {
  try {
    const { id_usuario, id_bloqueado } = options;

    const bloqueado = await db.bloqueados.create({ data: { id_usuario, id_bloqueado }});
    return crear_respuesta(200, 'Usuario bloqueado correctamente', bloqueado);
  } catch (e: unknown) {
    console.error(`Error al bloquear: ${e}`);
    return crear_respuesta(400, 'Hubo un error al bloquear el usuario');
  }
}