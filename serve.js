// Minimal static file server for the built blog (dist/).
// Usage: node serve.js [port]
const http = require('http')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, 'dist')
const port = Number(process.argv[2] || 4173)

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4'
}

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent(req.url.split('?')[0])
    if (pathname === '/' || pathname.endsWith('/')) pathname += 'index.html'
    const filePath = path.join(root, pathname)
    if (!filePath.startsWith(root)) {
      res.writeHead(403).end('Forbidden')
      return
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // SPA fallback
        fs.readFile(path.join(root, 'index.html'), (e2, fallback) => {
          if (e2) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('404 Not Found')
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(fallback)
          }
        })
        return
      }
      const ext = path.extname(filePath).toLowerCase()
      res.writeHead(200, {
        'Content-Type': mime[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache'
      })
      res.end(data)
    })
  })
  .listen(port, '127.0.0.1', () => {
    console.log('Blog running at http://127.0.0.1:' + port)
  })
