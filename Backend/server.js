const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`🖥️  Server running at\x1b[34m http://localhost:${port}\x1b[0m`);
})