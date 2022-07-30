const express = require('express')
const router = express.Router()
const Student = require('../models/student')

router.get('/', async (req, res) => {
  try {
    const students = await Student.find({})
    res.render('index', {
      students: students,
    })
  } catch (error) {
    res.redirect('/')
  }
})

module.exports = router
