const pool = require('./pool.js')
const bcrypt = require('bcryptjs')

async function createUser(username, first_name, last_name, password, membership = "regular") {
    const hashedPass = await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO users (username, first_name, last_name, password, membership) VALUES ($1, $2, $3, $4, $5)", [username, first_name, last_name, hashedPass, membership])
}

module.exports = { createUser }
