const express = require('express');
const vehicleController = require('./src/controllers/vehicleController')

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/vehicles', vehicleController.getVehicles);
app.get('/vehicles/:vehicle_id', vehicleController.getVehicleById);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
