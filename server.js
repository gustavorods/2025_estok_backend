const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.PORT;

// Allow recive JSON
app.use(express.json());

// import routes 
const iotRoutes = require('./routes/iotRoutes');
const auth = require('./middlewares/auth')

// Using router
app.use('/api/estok', auth.checkApiKey, iotRoutes)

// see server logs
app.listen(port, () => {
    console.log(`App is running in http://localhost:${port}`);
});