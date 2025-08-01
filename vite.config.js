import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'CRUD-APP',
  server: {
    host: '0.0.0.0', // Allows external connections
    port: 5500,     // Matches your desired port
  },
  preview: {
    host: '0.0.0.0', // Allows external connections for preview
    port: 5500,      // Matches your desired port
  },
});