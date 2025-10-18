require('dotenv').config()
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const { initWebSocket } = require('./services/socketService');


// Allows any origin (for development only)
app.use(cors());

// or, to allow only its front:
/*
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','x-api-key']
}));
*/

const port = process.env.PORT || 3000;

// Allow recive JSON
app.use(express.json());

// import routes 
const iotRoutes = require('./routes/iotRoutes');
const productRoutes = require('./routes/productRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const auth = require('./middlewares/auth');

// Using router
app.use('/api/estok/iot', auth.checkApiKey, iotRoutes);
app.use('/api/estok/product', auth.checkApiKey, productRoutes);
app.use('/api/estok/employee', auth.checkApiKey, employeeRoutes);

// Make a HTTP server with express
const server = http.createServer(app);

// Initializes the WebSocket passing the HTTP server
initWebSocket(server);

// see server logs
server.listen(port, () => {
    console.log(`App is running in ${process.env.API_URL || "localhost:"+port}`);
});