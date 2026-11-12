// Zero-dependency local server for the UEH Learning demo
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let rel;
  try { rel = decodeURIComponent(req.url.split('?')[0]); } catch { rel = '/'; }
  let filePath = path.resolve(PUBLIC_DIR, '.' + (rel === '/' ? '/index.html' : rel));
  // Only files inside this folder, and never hidden ones (.claude, .git …).
  const inside = filePath.startsWith(PUBLIC_DIR + path.sep) && !path.relative(PUBLIC_DIR, filePath).split(path.sep).some(p => p.startsWith('.'));
  if (!inside) { res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' }); res.end('Không được phép truy cập.'); return; }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('Lỗi máy chủ nội bộ: ' + readErr.message);
        return;
      }
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') console.error(`\nCổng ${PORT} đang được dùng. Đóng chương trình đang chiếm cổng, hoặc chạy với cổng khác, ví dụ: set PORT=3100 && node server.js\n`);
  else console.error(err);
  process.exit(1);
});

// 127.0.0.1: only this computer can open the demo, not other machines on the network.
server.listen(PORT, '127.0.0.1', () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n=========================================================`);
  console.log(`UEH LEARNING DEMO ĐANG CHẠY`);
  console.log(`🔗 Địa chỉ truy cập: ${url}`);
  console.log(`💡 Nhấn Ctrl + C để dừng máy chủ bất kỳ lúc nào.`);
  console.log(`=========================================================\n`);

  // Auto open browser on Windows
  exec(`start ${url}`, (err) => {
    if (err) console.log('Không thể tự động mở trình duyệt, hãy mở thủ công:', url);
  });
});
