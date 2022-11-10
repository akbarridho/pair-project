const express = require('express')
const app = express()
const index = require('./routers/index')
const port = 3000
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'keyboard cat', // harus ada
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true // untuk security dari csrf attack
     } // http
  }))

app.use('/', index )
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})