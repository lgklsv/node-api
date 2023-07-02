import 'dotenv/config';
import http from 'http';

const PORT = process.env.PORT || 5137;

const server = http.createServer(async (req, res) => {
  if (req.url === '/api' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.write('Hi there, This is a Vanilla Node.js API');

    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
