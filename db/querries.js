const pool = require('./pool.js')
const bcrypt = require('bcryptjs')

async function createUser(username, first_name, last_name, password, membership = "regular") {
    const hashedPass = await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO users (username, first_name, last_name, password, membership) VALUES ($1, $2, $3, $4, $5)", [username, first_name, last_name, hashedPass, membership])
}

async function getPosts() {
    const { rows } = await pool.query("SELECT messages.id, title, author, text, time, username FROM messages, users WHERE author = users.id")
    return rows
}

async function createPost(author, title, text) {
    await pool.query("INSERT INTO messages (author, title, text, time) VALUES ($1, $2, $3, $4)", [author, title, text, new Date()])
}

async function deletePost(id) {
    await pool.query("DELETE FROM messages WHERE id = $1", [id])
}

async function changeMembership (id, membership) {
    await pool.query("UPDATE users SET membership = $1 WHERE id = $2", [membership, id])
}

module.exports = { createUser, changeMembership, createPost, getPosts, deletePost }
