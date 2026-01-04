/// <reference types="vite/client" />

// Type declaration for vite-plugin-eslint (no @types package available)
declare module 'vite-plugin-eslint' {
  import { Plugin } from 'vite';
  export default function eslint(options?: Record<string, unknown>): Plugin;
}
