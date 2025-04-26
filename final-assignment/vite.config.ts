import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteMockServe } from 'vite-plugin-mock';

export default defineConfig({

server: {
    port: 3000,
    
},

  plugins: [
    react(),
    tsconfigPaths(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
  ],
});
