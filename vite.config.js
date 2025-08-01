import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allows external connections
    port: 5500,     // Matches your desired port
  },
  preview: {
    host: '0.0.0.0', // Allows external connections for preview
    port: 5500,      // Matches your desired port
  },
});