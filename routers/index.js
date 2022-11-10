const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const employee = require('./employee')
const register = require('./register')
const login = require('./login')

router.use('/register', register)
router.use('/login', login)
router.use(function(request, response, next){
    if (!request.session.userId){
        const error = 'Please Login First'
        response.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})
router.get('/', Controller.renderHome)
router.get('/logout', Controller.logOut)
router.use('/employees', employee)

module.exports = router