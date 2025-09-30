const WebSocket = require('ws');

let wss = null;

function initWebSocket(server) {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Ws client connect');
        ws.send(JSON.stringify({type: 'WELCOME', payload: 'Connect with WebSocket'}));

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

// Broadcast for all clients connected
function broadcast() {
    if (!wss) return;

    // Ensure that clients all recive JSON
    const msg = JSON.stringify({
        type: 'PRODUCTS_CHANGED',
        payload: null
    })

    wss.clients.forEach((client) => {
        if(client.readyState == WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

module.exports = { initWebSocket, broadcast };