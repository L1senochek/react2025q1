import { type RouteConfig, prefix, route } from '@react-router/dev/routes';

export default [
  route('/', './index.ts'),
  ...prefix('main', [
    route('/', './routes/main.tsx', [
      route('character/:characterId', './routes/character.tsx'),
    ]),
  ]),
  route('*?', 'catchall.tsx'),
] satisfies RouteConfig;
