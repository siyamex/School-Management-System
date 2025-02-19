const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });

  ws.send('You are connected to the WebSocket server');
});

module.exports = wss;