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

module.exports = { getVehicles, getVehicleById }