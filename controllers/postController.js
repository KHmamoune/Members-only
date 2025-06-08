const db = require("../db/querries.js")

async function renderPostForm(req, res) {
    res.render('post-form')
}

async function createPost(req, res) {
    const data = req.body
    await db.createPost(req.user.id, data.title, data.text)
    res.redirect('/')
}

async function deletePost(req, res) {
    const { id } = req.params
    await db.deletePost(id)
    res.redirect('/')
}

module.exports = { renderPostForm, createPost, deletePost }
