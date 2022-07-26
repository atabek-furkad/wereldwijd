const express = require('express')
const router = express.Router()
const Student = require('../models/student')

// all students route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name != '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  if (req.query.country != null && req.query.country != '') {
    searchOptions.country = new RegExp(req.query.country, 'i')
  }
  console.log('searchOptions', searchOptions)
  try {
    const students = await Student.find(searchOptions)
    res.render('students/index', {
      students: students,
      searchOptions: req.query,
    })
  } catch (error) {
    res.redirect('/')
  }
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
