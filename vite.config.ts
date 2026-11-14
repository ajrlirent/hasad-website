import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

const apkMimePlugin = {
  name: 'hasad-apk-mime',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (!req.url || !req.url.split('?')[0].toLowerCase().endsWith('.apk')) return next();
      const filePath = path.join(__dirname, 'public', path.basename(req.url.split('?')[0]));
      fs.readFile(filePath, (err, data) => {
        if (err) return next();
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Disposition', 'attachment; filename="HASAD.apk"');
        res.setHeader('Content-Length', data.length);
        if (req.method === 'HEAD') return res.end();
        res.end(data);
      });
    });
  },
  configurePreviewServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (!req.url || !req.url.split('?')[0].toLowerCase().endsWith('.apk')) return next();
      const filePath = path.join(__dirname, 'dist', path.basename(req.url.split('?')[0]));
      fs.readFile(filePath, (err, data) => {
        if (err) return next();
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Disposition', 'attachment; filename="HASAD.apk"');
        res.end(data);
      });
    });
  },
};

export default defineConfig(() => {
  const base = process.env.GITHUB_PAGES === "true" ? "/hasad-website/" : "/";
  return {
    base,
    plugins: [react(), tailwindcss(), apkMimePlugin],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'lucide-react',
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : { ignored: ['**/public/hasad.apk'] },
      // Allow tunnel/remote hosts (e.g. trycloudflare.com) to reach the dev server.
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
  };
});
