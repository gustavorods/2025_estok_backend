const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.PORT;

// Allow recive JSON
app.use(express.json());

// import routes 
const iotRoutes = require('./routes/iotRoutes');
const productRoutes = require('./routes/productRoutes');
const auth = require('./middlewares/auth');

// Using router
app.use('/api/estok/iot', auth.checkApiKey, iotRoutes);
app.use('/api/estok/product', auth.checkApiKey, productRoutes);

// see server logs
app.listen(port, () => {
    console.log(`App is running in http://localhost:${port}`);
});