const Ledger = require("../models/ledger_model");

const fetchPayable = async (req, res) => {
    const { location, id } = req.params;

    try {
        let query = {};

        // If both location and ledger are provided, include both in the query
        if (location && id) {
            query = { region: location, _id: id };
        } else if (location) {
            // If only location is provided, search by location
            query = { region: location };
        } else {
            // If neither location nor ledger is provided, return an error
            return res.status(400).json({ error: "Location parameter is required" });
        }

        console.log("Location:", location);
        console.log("Ledger:", id);

        const result = await Ledger.find(query);

        return res.json({
            success: true,
            message: "Fetched Data Successfully!",
            data: result,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { fetchPayable };



