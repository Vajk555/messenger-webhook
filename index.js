const http = require('http');
const url = require('url');

const VERIFY_TOKEN = 'barbershop123';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;

  if (req.method === 'GET' && query['hub.mode'] === 'subscribe' && query['hub.verify_token'] === VERIFY_TOKEN) {
    res.writeHead(200);
    res.end(query['hub.challenge']);
  } else {
    res.writeHead(200);
    res.end('OK');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
