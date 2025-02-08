import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
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
      ],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/tests/setup.ts',
    exclude: [...configDefaults.exclude, 'node_modules/**'],
  },
});
