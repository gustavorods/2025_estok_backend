const productModel = require('../models/productModel');

// Send all historical datas
async function getHistoricalData(req, res) {
    try{
        const data = await productModel.getHistorical();
        res.status(200).send(data);
    } catch (error) {
        console.error(`Error to get product historical. ${ERROR}`);
        res.status(500).send(`Internal server error`);
    }
}

module.exports = { getHistoricalData };