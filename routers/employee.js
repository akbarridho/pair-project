const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/add', Controller.renderAdd)
router.post('/add', Controller.handleAdd)
router.get('/edit/:id', Controller.renderEdit)
router.post('/edit/:id', Controller.handleEdit)
router.get('/delete/:id', Controller.deleteEmployee)

module.exports = router