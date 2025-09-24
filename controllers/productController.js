const productModel = require('../models/productModel');

// Send all history datas
async function getHistoryData(req, res) {
    try{
        const data = await productModel.getHistory();
        res.status(200).send(data);
    } catch (error) {
        console.error(`Error to get product history. ${error}`);
        res.status(500).json({ message: 'Error getting product history.' });
    }
}

// returns all expired products that are present on the shelf
async function getExpiredProduct(req, res) {
    try {
        const data = await productModel.getExpiredProduct();
        res.status(200).send(data);
    } catch(error) {
        console.error(`Error to get expired product. ${error}`);
        res.status(500).json({message: 'Error to getting expired product.'});
    }
}

module.exports = { getHistoryData, getExpiredProduct };