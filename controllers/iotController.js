// Displays the IoT EPC in the console
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

module.exports = showEpc;
