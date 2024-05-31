const express = require('express');
const vehicleController = require('./src/controllers/vehicleController')

const app = express();
const PORT = 3000;

app.use(express.json());

//API ENDPOINT routes
app.get('/vehicles', vehicleController.getVehicles);
app.post('/vehicles', vehicleController.addNewVehicle);
app.get('/vehicles/:vehicle_id', vehicleController.getVehicleById);
app.delete('/vehicles/:vehicle_id', vehicleController.deleteVehicleById);
app.put('/vehicles/:vehicle_id', vehicleController.updateVehicleById);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
