const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacher')
const DutchClass = require('../models/dutchClass')

// all teachers route
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find({})
    res.render('teachers/index', {
      teachers: teachers,
    })
  } catch (error) {}
})

// new teacher route
router.get('/new', async (req, res) => {
  try {
    const dutchClasses = await DutchClass.find({})
    res.render('teachers/new', {
      teacher: new Teacher(),
      dutchClasses: dutchClasses,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  // if (req.body.dutchClass == null) {
  //   const dutchClass = null
  // }

  const newTeacher = new Teacher({
    name: req.body.name,
    dutchClass: req.body.dutchClass,
  })

  console.log(newTeacher)

  try {
    await newTeacher.save()

    res.redirect(`teachers/${newTeacher.id}`)
  } catch (error) {}
})

router.get('/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id)
  try {
    res.render(`teachers/profile`, {
      teacher: teacher,
    })
  } catch (error) {}
})

module.exports = router
