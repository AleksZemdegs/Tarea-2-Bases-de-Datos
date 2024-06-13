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
  .post('/registrar', ({ body }) => registrar_usuario(body), {
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
  
  .post('/bloquear', ({body}) => bloquear_usuario(body), {
    body: t.Object({
      id_usuario: t.Numeric(),
      id_bloqueado: t.Numeric(),
    })
  })

  .post('/enviarcorreo', ({ body }) => enviar_correo(body), {
    body: t.Object({
      id_remitente: t.Numeric(),
      id_destinatario: t.Numeric(),
      asunto: t.String({
        minLength: 1,
        maxLength: 30,
      }),
      cuerpo: t.String({
        minLength: 1,
        maxLengh: 250,
      }),
    })
  })

  .post('/marcarcorreo', ({ body }) => marcar_correo(body), {
    body: t.Object({
      id_usuario: t.Numeric(),
      id_correo: t.Numeric(),
    })
  })

  .delete('/desmarcarcorreo', ({ body }) => desmarcar_correo(body), {
    body: t.Object({
      id_usuario: t.Numeric(),
      id_correo: t.Numeric(),
    })
  })

  .get('/mostrarfavoritos', ({ body }) => mostrar_favoritos(body), {
    body: t.Object({
      id_usuario: t.Numeric(),
    })
  })

  .get('/informacion/:correo', ({ params: { correo } }) => get_usuario(correo), {
    params: t.Object({
      correo: t.String(),
    })
  })

export default api_routes;