import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'photo-upload-handler',
        configureServer(server) {
          server.middlewares.use('/api/upload-photo', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const { filename, base64 } = JSON.parse(body);
                  if (filename && base64) {
                    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
                    const buffer = Buffer.from(cleanBase64, 'base64');
                    
                    const publicDir = path.resolve(__dirname, 'public');
                    if (!fs.existsSync(publicDir)) {
                      fs.mkdirSync(publicDir, { recursive: true });
                    }
                    
                    fs.writeFileSync(path.resolve(publicDir, filename), buffer);
                    fs.writeFileSync(path.resolve(__dirname, filename), buffer);
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: true, filename }));
                  }
                } catch (e) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  return res.end(JSON.stringify({ error: String(e) }));
                }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing filename or base64 data' }));
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
