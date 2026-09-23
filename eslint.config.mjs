import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import ts from 'typescript-eslint';

export default ts.config(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.astro-scaffold/**',
      '.agents/**',
      '.impeccable/**',
      'old-site/**',
      'docs/**',
      'worker-configuration.d.ts',
      'node_modules/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.mjs'],
    languageOptions: { globals: { process: 'readonly', URL: 'readonly' } },
  },
  {
    files: ['src/**/*.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'error' },
  },
);
