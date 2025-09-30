const productModel = require('../models/productModel');
const { broadcast } = require ('../services/socketService');

// Displays the IoT EPC in the console (Just for test)
/*
async function showEpc(req, res) {
    try {
        const epc = req.body; // pega o corpo da requisição

        console.log("Received EPC:", epc);

        return res.status(201).send("The request worked!");
    } catch (error) {
        console.error("Error in showEpc:", error);
        return res.status(500).send("Something went wrong!");
    }
}
*/

// update the database history when the iot send a request
async function updateHistory(req, res) {
    try {
        const {epc, status} = req.body;
        await productModel.updateStatusProduct(epc, status);
        broadcast(); // Notifies the Front-end that something has changed
        res.status(200).json({message: 'Product status updated successfully'});
    } catch (error) {   
        console.log(`Error to get product history. ${error}`);
        res.status(500).json({ message: "Error updating product history" }); 
    } 
}

module.exports = {updateHistory};
