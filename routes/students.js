const express = require('express')
const router = express.Router()
const Student = require('../models/student')

// all students route
router.get('/', (req, res) => {
  res.render('students/index')
})

// new student route
router.get('/new', (req, res) => {
  res.render('students/new', { student: new Student() })
})

// create student route
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    preferredLanguage: req.body.preferredLanguage,
    country: req.body.country,
  })

  try {
    const newStudent = await student.save()
    res.redirect('students')
  } catch (error) {
    res.render('students/new', {
      student: student,
      errorMessage: 'Error creating Student',
    })
  }
})

module.exports = router
