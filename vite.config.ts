import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteStylelint from 'vite-plugin-stylelint';
import { configDefaults } from 'vitest/config';

const viteStylelintOptions = {
  include: ['src/**/*.{css,scss,less,vue,svelte}'],
  exclude: ['node_modules', 'dist'],
  fix: true,
  cache: false,
  lintInWorker: true,
  dev: true,
};

export default defineConfig({
  plugins: [react(), viteStylelint(viteStylelintOptions)],
  // resolve: { alias: { '@': '/src' } },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src/'),
      },
    ],
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
        'src/App.tsx',
        'src/main.tsx',
      ],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/tests/setup.ts',
    exclude: [...configDefaults.exclude, 'node_modules/**'],
  },
});
