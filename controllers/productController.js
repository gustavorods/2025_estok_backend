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

// Function that returns all products separating them into categories (low stock, medium stock, expired)
async function getProductStatus(req, res) {
    try {
        // Get all products
        const products = await productModel.getAllProducts();
        if (!products) throw new Error('No products in the database;');
        
        // Schema of object that have to return to the fron-end
        let statusProduct = {
            lowStock: [],
            mediumStock: [],
            highStock: [],
            expired: []
        };

        for (const product of products) {
            if(isExpired(product)){ 
                statusProduct.expired.push(product);
            } 

            const category = categorizeStock(product);
            statusProduct[category].push(product);
        }

        // Summarizing high, medium and low stock
        const productsSummarized = summarizeStockStatus(statusProduct)

        // Server response
        res.status(200).send(productsSummarized)
    } catch (error) {
        console.log(`Error to get product status. ${error.message}`);
        res.status(500).json({message: "Error to get product status."});
    }
}

// Function to check validity
function isExpired(product) {
    return new Date(product.validade) < new Date();
}

// Function to categorize stock
function categorizeStock(product) {
    // Threshold
    const lowThreshold = Math.round(product.qtd_max * 0.2);
    const mediumThreshold = Math.round(product.qtd_max * 0.5);

    // Returns which part of the "StatusProduct" it will be part of
    if(product.qtd_atual <= lowThreshold) return 'lowStock';
    if(product.qtd_atual <= mediumThreshold) return 'mediumStock';
    return 'highStock';
}

/* This function will summarize the lowStock, mediumStock, and highStock sections.

Example:
The same product will arrive several times with a low stock quantity (lowStock), something like:
leite - integral - italac - 20 unidade
leite - integral - italac - 20 unidade
achocolatado - sem açucar - nescau - 10 unidades
achocolatado - sem açucar - nescau - 10 unidades

This function will summarize this to this:
leite - integral - italac - 20 unidade
achocolatado - sem açucar - nescau - 10 unidades

Removing the excess
*/
function summarizeStockStatus(product_status) {
  function uniqueProducts(products) {
    const seen = new Set();
    return products.filter(p => {
      const key = `${p.produto}-${p.tipo}-${p.marca}`;
      if (seen.has(key)) {
        return false; // já vimos este produto -> remover
      }
      seen.add(key);
      return true; // primeira vez -> manter
    });
  }

  return {
    lowStock: uniqueProducts(product_status.lowStock),
    mediumStock: uniqueProducts(product_status.mediumStock),
    highStock: uniqueProducts(product_status.highStock),
    expired: product_status.expired // deixei intacto por opção
  };
}


module.exports = { getHistoryData, getProductStatus };

