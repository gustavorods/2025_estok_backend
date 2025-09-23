const productModel = require('../models/productModel');

// Send all history datas
async function getHistoryData(req, res) {
    try{
        const data = await productModel.getHistory();
        res.status(200).send(data);
    } catch (error) {
        console.error(`Error to get product history. ${error}`);
        res.status(500).json({ message: "Error getting product history" });
    }
}

module.exports = { getHistoryData };