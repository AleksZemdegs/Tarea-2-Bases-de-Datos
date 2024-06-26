import { Elysia, t } from 'elysia';

import {
  registrar_usuario,
  get_usuario,
  enviar_correo,
  marcar_correo,
  desmarcar_correo,
  mostrar_favoritos,
  bloquear_usuario,
} from './handlers';

const api_routes = new Elysia()
  .post('/registrar', async ({ body }) => {
    const respuesta = await registrar_usuario(body);
    return respuesta;
  }, {
    body: t.Object({
      nombre: t.String({
        minLength: 1,
        maxLength: 20,
      }),
      correo: t.String({
        minLength: 3,
        maxLength: 50,
      }),
      clave: t.String({
        minLength: 4,
        maxLength: 20,
      }),
      descripcion: t.String({
        minLength: 1,
        maxLength: 100,
      }),
    })
  })
  
  .post('/bloquear', async ({ body }) => {
    const respuesta = await bloquear_usuario(body);
    return respuesta;
  }, {
    body: t.Object({
      correo: t.String({
        minLength: 3,
        maxLength: 50,
      }),
      clave: t.String({
        minLength: 4,
        maxLength: 20,
      }),
      otro_correo: t.String({
        minLength: 3,
        maxLength: 50,
      }),
    })
  })

  .post('/enviarcorreo', async ({ body }) => {
    const respuesta = await enviar_correo(body);
    return respuesta;
  }, {
    body: t.Object({
      id_remitente: t.Numeric(),
      id_destinatario: t.Numeric(),
      asunto: t.String({
        minLength: 1,
        maxLength: 30,
      }),
      cuerpo: t.String({
        minLength: 1,
        maxLength: 250,
      }),
    })
  })

  .post('/marcarcorreo', async ({ body }) => {
    const respuesta = await marcar_correo(body);
    return respuesta;
  }, {
    body: t.Object({
      correo: t.String({
        minLength: 3,
        maxLength: 50,
      }),
      clave: t.String({
        minLength: 4,
        maxLength: 20,
      }),
      id_correo_a_encontrar: t.Numeric({
        minLength: 3,
        maxLength: 50,
      }),
    })
  })

  .delete('/desmarcarcorreo', async ({ body }) => {
    const respuesta = await desmarcar_correo(body);
    return respuesta;
  }, {
    body: t.Object({
      correo: t.String({
        minLength: 3,
        maxLength: 50,
      }),
      clave: t.String({
        minLength: 4,
        maxLength: 20,
      }),
      id_correo_a_desmarcar: t.Numeric({
        minLength: 3,
        maxLength: 50,
      }),
    })
  })

  .get('/mostrarfavoritos', async ({ query }) => {
    const { id_user } = query;
    const respuesta = await mostrar_favoritos(parseInt(id_user));
    return respuesta;
  }, {
    query: t.Object({
      id_user: t.String(),
    })
  })

  .get('/informacion/:correo', async ({ params: { correo } }) => {
    const respuesta = await get_usuario(correo);
    return respuesta;
  }, {
    params: t.Object({
      correo: t.String(),
    })
  })

export default api_routes;