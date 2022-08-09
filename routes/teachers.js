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
  } catch (error) {}
})

router.post('/', async (req, res) => {
  const newTeacher = new Teacher({
    name: req.body.name,
    dutchClass: req.body.dutchClass,
  })

  try {
    await newTeacher.save()

    res.redirect(`teachers/${newTeacher.id}`)
  } catch (error) {}
})

router.get('/:id', async (req, res) => {
  try {
  } catch (error) {}
})

module.exports = router
