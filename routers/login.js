const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.renderLoginForm)
router.post('/', Controller.handleLoginForm)

module.exports = router