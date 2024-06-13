import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import api_routes from './routes/posts';
 
const app = new Elysia();

app
  .group('/api', (app) => app.use(api_routes))
  .listen(process.env.PORT || 3049);
 
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);