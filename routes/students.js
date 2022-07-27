const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Student = require('../models/student')
const uploadPath = path.join('public', Student.coverImageBasePath)
const imageMimeTypes = ['image/png', 'image/jpeg', 'image/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  },
})

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
router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const student = new Student({
    name: req.body.name,
    birthDate: new Date(req.body.birthDate),
    preferredLanguage: req.body.preferredLanguage,
    country: req.body.country,
    coverImageName: fileName,
  })
  // console.log('req.body.birthDate', req.body.birthDate)
  try {
    const newStudent = await student.save()
    res.redirect('students')
  } catch (error) {
    if (student.coverImageName != null) {
      removeBookCover(student.coverImageName)
    }
    res.render('students/new', {
      student: student,
      errorMessage: 'Error creating Student',
    })
  }
})

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (error) => {
    if (error) console.error(error)
  })
}

module.exports = router
