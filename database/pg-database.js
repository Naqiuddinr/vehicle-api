const { Pool } = require('pg');

//create pool instance for model to connect
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "abc123",
    database: "postgres"
})

module.exports = pool;