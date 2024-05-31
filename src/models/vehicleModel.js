const pool = require('../../database/pg-database');

//Model to list all vehicle
const getVehicles = async () => {
    const client = await pool.connect(); //connect to postgres DB
    try {

        const response = await client.query('SELECT * FROM vehicles'); //query database to SELECT ALL from vehicles table
        return response.rows; //pass response to controller

    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
    finally {
        client.release();
    }
};

//Model to add new vehicle into vehicles table
const addNewVehicle = async ({ type, latitude, longitude }) => {
    const client = await pool.connect(); //connect to postgres DB

    try {
        const response = await client.query(`INSERT INTO vehicles (type, lock_status, current_speed, battery_level, status, latitude, longitude, last_updated) 
                                        VALUES ($1, 'Lock', '0', '0', 'PARKING', $2, $3, NOW()) 
                                        RETURNING *`, [type, latitude, longitude]); //query database to INSERT data into vehicles table
        return response.rows[0]; //pass response to controller
    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
    finally {
        client.release();
    }
};

//Model to retrieve data of specific vehicle by ID
const getVehicleById = async (vehicle_id) => {
    const client = await pool.connect();

    try {
        //query database to SELECT from vehicles table by vehicle ID
        const response = await client.query(`SELECT * FROM vehicles WHERE vehicle_id = $1`, [vehicle_id]);
        return response.rows[0];

    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
    finally {
        client.release();
    }
}

//Model to delete a vehicle from the vehicles table by ID
const deleteVehicleById = async (vehicle_id) => {
    const client = await pool.connect();

    try {
        //query database to DELETE from vehicles table by vehicle ID
        const response = await client.query(`DELETE FROM vehicles WHERE vehicle_id = $1 RETURNING *`, [vehicle_id]);
        return response.rows[0];

    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
    finally {
        client.release();
    }
}

//Model to update a vehicle from vehicles table by ID
const updateVehicleById = async (vehicle_id, newVehicleData) => {
    const client = await pool.connect();

    try {
        //query database to UPDATE from vehicles table by vehicle ID
        //COALESCE - to handle any null value, use existing data instead(not nessecary)
        const response = await client.query(`
        UPDATE Vehicles
        SET 
            type = COALESCE($1, type),
            lock_status = COALESCE($2, lock_status),
            current_speed = COALESCE($3, current_speed),
            battery_level = COALESCE($4, battery_level),
            status = COALESCE($5, status),
            latitude = COALESCE($6, latitude),
            longitude = COALESCE($7, longitude),
            last_updated = COALESCE($8, last_updated)
        WHERE vehicle_id = $9
        RETURNING *;`,
            [
                newVehicleData.type,
                newVehicleData.lock_status,
                newVehicleData.current_speed,
                newVehicleData.battery_level,
                newVehicleData.status,
                newVehicleData.latitude,
                newVehicleData.longitude,
                newVehicleData.last_updated,
                vehicle_id
            ]);

        return response.rows[0];

    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
    finally {
        client.release();
    }
}

module.exports = { getVehicles, addNewVehicle, getVehicleById, deleteVehicleById, updateVehicleById }