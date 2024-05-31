const vehicleModel = require('../models/vehicleModel');

const getVehicles = async (req, res) => {

    try {

        const response = await vehicleModel.getVehicles();
        res.status(200).json(response);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const addNewVehicle = async (req, res) => {

    const { type, latitude, longitude } = req.body;

    try {

        const response = await vehicleModel.addNewVehicle({ type, latitude, longitude });
        res.status(200).json(response);

    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getVehicleById = async (req, res) => {

    const vehicle_id = req.params.vehicle_id;

    try {

        const response = await vehicleModel.getVehicleById(vehicle_id);

        if (!response) {
            res.status(404).json({ message: 'Invalid Vehicle ID' });
        }

        res.status(200).json(response);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
}

const deleteVehicleById = async (req, res) => {

    const vehicle_id = req.params.vehicle_id;

    try {

        const response = await vehicleModel.deleteVehicleById(vehicle_id);

        if (!response) {
            res.status(404).json({ message: 'Invalid Vehicle ID' });
        }

        res.status(200).json({ message: `Vehicle ID ${vehicle_id} deleted successfully` });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const updateVehicleById = async (req, res) => {

    const vehicle_id = req.params.vehicle_id;
    const newVehicleData = req.body;

    try {

        const response = await vehicleModel.updateVehicleById(vehicle_id, newVehicleData);

        if (!response) {
            res.status(404).json({ message: 'Invalid Vehicle ID' });
        }

        res.status(200).json({ message: `Vehicle ID ${vehicle_id} updated successfully`, data: response });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { getVehicles, addNewVehicle, getVehicleById, deleteVehicleById, updateVehicleById };