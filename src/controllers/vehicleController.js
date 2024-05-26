const vehicleModel = require('../models/vehicleModel');

const getVehicles = async (req, res) => {

    try {

        const response = await vehicleModel.getVehicles();
        res.json(response);

    }
    catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');

    }
};

const getVehicleById = async (req, res) => {

    const vehicle_id = req.params.vehicle_id;

    try {

        const response = await vehicleModel.getVehicleById(vehicle_id);

        if (!response) {
            res.status(404).json({ message: 'Invalid Vehicle ID' });
        }

        res.json(response);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
}

module.exports = { getVehicles, getVehicleById };