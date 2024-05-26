const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "abc123",
    database: "postgres"
})

module.exports = pool;