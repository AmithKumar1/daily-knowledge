import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  try {
    console.log(`[REQ] ${req.method} ${req.url}`);
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    const safe = normalize(pathname).replace(/^([.][.][/\\])+/, '');
    const filePath = join(root, safe);
    if (!filePath.startsWith(root)) throw new Error('Forbidden');
    statSync(filePath);
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch (err) {
    console.error(`[ERR] ${req.url}:`, err?.message);
    const status = err?.message === 'Forbidden' ? 403 : 404;
    res.writeHead(status, {'Content-Type':'text/plain; charset=utf-8'});
    res.end(status === 404 ? 'Not found' : 'Forbidden');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Daily Knowledge running at http://localhost:${port}`);
});
