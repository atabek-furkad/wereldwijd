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
  // console.log('new Student', new Student())
})

// create student route
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    birthDate: new Date(req.body.birthDate),
    preferredLanguage: req.body.preferredLanguage,
    country: req.body.country,
  })

  if (req.body.cover != '') {
    saveCover(student, req.body.cover)
  }

  try {
    const newStudent = await student.save()
    res.redirect(`students/${student.id}`)
  } catch (error) {
    res.render('students/new', {
      student: student,
      errorMessage: 'Error creating Student',
    })
  }
})

// display student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    res.render('students/profile', {
      student: student,
    })
  } catch (error) {
    res.redirect('students')
  }
})

// edit student by ID
router.get('/:id/edit', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
    res.render('students/edit', {
      student: student,
    })
  } catch (error) {
    res.redirect('/students')
  }
})

// update student by ID
router.put('/:id', async (req, res) => {
  console.log('put is triggered', req.params.id)
  let student
  try {
    student = await Student.findById(req.params.id)
    student.name = req.body.name
    student.birthDate = new Date(req.body.birthDate)
    student.preferredLanguage = req.body.preferredLanguage
    student.country = req.body.country
    console.log('student', student.name)
    console.log(req.body.cover)
    if (req.body.cover != '') {
      saveCover(student, req.body.cover)
    }
    await student.save()
    res.redirect(`/students/${student.id}`)
  } catch (error) {
    if (student == null) {
      res.redirect('/')
      console.log('student does not exist')
    } else {
      res.render('students/edit', {
        student: student,
        errorMessage: 'Error Updating Student',
      })
    }
  }
  // res.send('Update student ' + req.params.id)
})

// delete student by ID
router.delete('/:id', async (req, res) => {
  let student
  try {
    student = await Student.findById(req.params.id)
    await student.remove()
    res.redirect('/students')
  } catch (error) {
    if (student == null) {
      res.redirect('/')
      console.log('student does not exist')
    } else {
      res.redirect(`/students/${student.id}`)
    }
  }
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
