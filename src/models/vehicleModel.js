const pool = require('../../database/pg-database');

const getVehicles = async () => {
    const client = await pool.connect();
    try {

        const response = await client.query('SELECT * FROM vehicles');
        return response.rows;

    }
    catch (err) {
        console.error(err.message);
    }
    finally {
        client.release();
    }
};

const addNewVehicle = async ({ type, latitude, longitude }) => {
    const client = await pool.connect();

    try {
        const response = await client.query(`INSERT INTO vehicles (type, lock_status, current_speed, battery_level, status, latitude, longitude, last_updated) 
                                        VALUES ($1, 'Lock', '0', '0', 'PARKING', $2, $3, NOW()) 
                                        RETURNING *`, [type, latitude, longitude]);
        return response.rows[0];
    }
    catch (err) {
        console.error(err.message);
    }
    finally {
        client.release();
    }
};

const getVehicleById = async (vehicle_id) => {
    const client = await pool.connect();

    try {

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

const deleteVehicleById = async (vehicle_id) => {
    const client = await pool.connect();

    try {

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

module.exports = { getVehicles, addNewVehicle, getVehicleById, deleteVehicleById }