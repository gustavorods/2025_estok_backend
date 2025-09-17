// Displays the iot epc in the console 
async function showEpc(req, res) {
    let epc = req.body;

    console.log(epc);

    res.status(201).send(`The req work it!`)
}


module.exports = {showEpc}