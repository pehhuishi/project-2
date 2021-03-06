const passport = require('../config/ppConfig')
const Customer = require('../models/customer')
const Admin = require('../models/admin')
const express = require('express')
const router = express.Router()
const adminCode = process.env.ADMIN_CODE

router.get('/', (req, res) => {
  res.render('customers/register')
})

router.post('/', (req, res, next) => {
  var data = req.body
  var newAdd;

    if (data.user.type === 'admin') {
      var adminData = data.user.txtAdmin

      if (adminData != adminCode){
        return res.redirect('/register')
      }

      newAdd = new Admin({
        name: data.user.txtName,
        email: data.user.txtEmail,
        password: data.user.txtPassword,
        type: data.user.type
      })
    }
    if (data.user.type === 'customer') {
      newAdd = new Customer({
        name: data.user.txtName,
        email: data.user.txtEmail,
        business: data.user.ddlBusinessType,
        password: data.user.txtPassword,
        type: data.user.type
      })
    }
    newAdd.save()// save the object that was created
    .then(user => {
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res, next)
    },
    err => res.redirect('/auth/signup')
  )

})

module.exports = router
