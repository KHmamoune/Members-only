const { Router } = require('express')
const postRouter = Router()
const { renderPostForm, createPost, deletePost } = require('../controllers/postController.js')

postRouter.get('/create', renderPostForm)
postRouter.post('/create', createPost)
postRouter.post('/delete/:id', deletePost)

module.exports = postRouter
