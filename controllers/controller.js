const { Employee, User } = require("../models")
const bcryptjs = require('bcryptjs')
const session = require('express-session')

class Controller {
    static renderRegisterForm(request, response){
        let {errors} = request.query
        response.render('registerForm', {errors})
    }

    static handleRegisterForm(request, response){
        // console.log(request.body)
        let { userName, email, password, role } = request.body
        User.create({userName, email, password, role})
            .then((data) => {
                response.redirect('/login')
            })
            .catch((err) => {
                if (err.name == 'SequelizeUniqueConstraintError' || 'SequelizeValidationError'){
                    let errors = err.errors.map(x => {
                        return x.message
                    })
                    response.redirect(`/register?errors=${errors}`)
                } else {
                    response.send(err)
                }
            })
    }

    static renderLoginForm(request, response){
        const {error} = request.query
        response.render('loginForm', {error})
    }

    static handleLoginForm(request, response){
        // 1. findOne User dari userName
        // 2. kalo User ada, compare plain password apakah sama dengan hash password (di DB)
        // 3. kalo ga sama passwordnya, ga boleh masuk ke home, keluar error
        // 4. kalo password sesuai, maka redirect ke home
        let { userName, password } = request.body
        User.findOne({where : {userName}})
            .then((data) => {
                if (data) {
                    const isValidPassword = bcryptjs.compareSync(password, data.password) // true atau false

                    if (isValidPassword) {
                        // case berhasil login

                        request.session.userId = data.id // set session di controller login

                        return response.redirect('/')
                    } else {
                        const error = "Invalid Username and Password"
                        return response.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid Username and Password"
                    return response.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                response.send(err)
            })
    }

    static logOut(request, response){
        request.session.destroy((err) => {
            if (err) {
                console.log(err)
            } else {
                response.redirect('/login')
            }
        })
    }
    
    static renderHome(request, response){
        const { sort, filter } = request.query
        const option = {}

        if (sort){
            option.order = [[sort, 'ASC']]
        }

        if (filter){
            option.where = {education: filter}
        }
        
        Employee.findAll(option)
            .then(data => {
                // response.send(data)
                response.render('home', { data })
            })
            .catch(err => {
                // console.log(err)
                response.send(err)
            })       
    }

    static renderAdd(request, response){
            response.render('addForm')
    }

    static handleAdd(request, response){
        // console.log(request.body)
        let { name, position, education, email, phone_number, profile_picture, age } = request.body
        Employee.create({name, position, education, email, phone_number, profile_picture, age})
            .then(data => {
                response.redirect('/')
            })
            .catch(err => {
                response.send(err)
            })
    }

    static renderEdit(request, response){
        let id = +request.params.id
        Employee.findOne({where: {id: id}})
            .then(data => {
                // response.send(data)
                response.render('editForm', { data })
            })
            .catch(err => {
                response.send(err)
            })
    }

    static handleEdit(request, response){
        let id = +request.params.id
        // console.log(request.body, id)
        let { name, position, education, email, phone_number, profile_picture, age } = request.body
        Employee.update({name, position, education, email, phone_number, profile_picture, age}, {where: {id: id}})
            .then(data => {
                response.redirect('/')
            })
            .catch(err => {
                response.send(err)
            })
    }

    static deleteEmployee(request, response){
        let id = +request.params.id
        Employee.destroy({where: {id: id}})
            .then(data => {
                response.redirect('/')
            })
            .catch(err => {
                response.send(err)
            })
    }
}

module.exports = Controller