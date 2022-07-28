const express = require('express')
const router = express.Router()

const Student = require('../models/student')

const imageMimeTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']

// all students route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name != '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  if (req.query.country != null && req.query.country != '') {
    searchOptions.country = new RegExp(req.query.country, 'i')
  }
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
  console.log('new Student', new Student())
})

// create student route
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    birthDate: new Date(req.body.birthDate),
    preferredLanguage: req.body.preferredLanguage,
    country: req.body.country,
  })

  saveCover(student, req.body.cover)

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

// display student by ID
router.get('/:id', (req, res) => {
  res.send('Show student ' + req.params.id)
})

// edit student by ID
router.get('/:id/edit', (req, res) => {
  res.send('Edit student ' + req.params.id)
})

// update student by ID
router.put('/:id', (req, res) => {
  res.send('Update student ' + req.params.id)
})

// delete student by ID
router.delete('/:id', (req, res) => {
  res.send('Delete student ' + req.params.id)
})

function saveCover(student, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    student.coverImage = new Buffer.from(cover.data, 'base64')
    student.coverImageType = cover.type
  }
}

module.exports = router
