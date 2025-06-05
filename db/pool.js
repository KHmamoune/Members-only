const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.HOST,
    password: process.env.PASSWORD,
    user: process.env.USER,
    port: process.env.PORT,
    database: process.env.DATABASE
})

module.exports = pool
