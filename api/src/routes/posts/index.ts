import { Elysia, t } from 'elysia';

import {
  registrar_usuario,
  get_usuario,
  enviar_correo
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
  
  .post('/bloquear', () => 'Bloquear Usuario')

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

  .post('/marcarcorreo', () => 'Marcar Correo')

  .delete('/desmarcarcorreo', () => 'Desmarcar Correo')

  .get('/informacion/:correo', ({ params: { correo } }) => get_usuario(correo), {
    params: t.Object({
      correo: t.String(),
    })
  })

export default api_routes;
 
// const postsRoutes = new Elysia({ prefix: '/posts' })
//   .get('/', () => getPosts())
//   .get('/:id', ({ params: { id } }) => getPost(id), {
//     params: t.Object({
//       id: t.Numeric(),
//     }),
//   })
//   .post('/', ({ body }) => createPost(body), {
//     body: t.Object({
//       title: t.String({
//         minLength: 3,
//         maxLength: 50,
//       }),
//       content: t.String({
//         minLength: 3,
//         maxLength: 50,
//       }),
//     }),
//   })
//   .patch('/:id', ({ params: { id }, body }) => updatePost(id, body), {
//     params: t.Object({
//       id: t.Numeric(),
//     }),
//     body: t.Object(
//       {
//         title: t.Optional(
//           t.String({
//             minLength: 3,
//             maxLength: 50,
//           })
//         ),
//         content: t.Optional(
//           t.String({
//             minLength: 3,
//             maxLength: 50,
//           })
//         ),
//       },
//       {
//         minProperties: 1,
//       }
//     ),
//   })
//   .delete('/', ({ body }) => deletePost(body), {
//     body: t.Object({
//       id: t.Numeric(),
//     }),
//   });
 
// export default postsRoutes;