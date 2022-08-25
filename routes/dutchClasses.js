const express = require('express')
const router = express.Router()
const DutchClass = require('../models/dutchClass')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const ClassPresence = require('../models/classPresence')

// all classes route
router.get('/', async (req, res) => {
  const timeRange = {}

  if (req.query.presenceDate != null && req.query.presenceDate != '') {
    timeRange.start = new Date(req.query.presenceDate)

    const nextDay = new Date(
      new Date(req.query.presenceDate).setDate(
        new Date(req.query.presenceDate).getDate() + 1,
      ),
    )
    timeRange.end = nextDay
  }

  // console.log(timeRange)

  try {
    const presenceList = await ClassPresence.findOne({
      createdAt: {
        $gte: timeRange.start,
        $lte: timeRange.end,
      },
    })

    // console.log(presenceList)

    let presentStudents

    if (presenceList != null) {
      presentStudents = await presenceList.populate('presenceList')
    }

    // const listStudents = await presenceList.populate('presenceList')

    // console.log(presentStudents)

    const dutchClasses = await DutchClass.find({})

    console.log(dutchClasses)
    res.render('dutchClasses/index', {
      dutchClasses: dutchClasses,
      presentStudents: presentStudents,
    })
  } catch (error) {}
})

// new class route
router.get('/new', async (req, res) => {
  // const teachers = await Teacher.find({})
  res.render('dutchClasses/new', {
    dutchClass: new DutchClass(),
    // teachers: teachers,
  })
})

// create class route
router.post('/', async (req, res) => {
  const newDutchClass = new DutchClass({
    name: req.body.name,
    // teacher: req.body.teacher,
  })
  try {
    await newDutchClass.save()

    res.redirect(`dutch-classes/`)
  } catch (error) {}
})

// view class list
router.get('/:id', async (req, res) => {
  try {
    const dutchClass = await DutchClass.findById(req.params.id)

    const students = await Student.find({ dutchClass: req.params.id })
    // console.log(students)
    // const populateTeachers = await dutchClass.populate('teacher')

    // const teachers = populateTeachers.teacher.map((element) => element.name)

    // console.log(dutchClass)
    // const teachers = await dutchClass.

    // console.log(teachers)

    // const students = await Student.find({ dutchClass: req.params.id })
    // const teachers = await Teacher.find({ dutchClass: req.params.id })

    // const teachersID = dutchClass.teacher.map((teacher) => {
    //   return teacher
    // })

    // console.log(teachers)
    res.render('dutchClasses/profile', {
      dutchClass: dutchClass,
      students: students,
      // teachers: teachers,
    })
  } catch (error) {}
})

router.post('/:id', async (req, res) => {
  const classPresence = new ClassPresence({
    dutchClass: req.params.id,
    presenceList: req.body.presentStudent,
  })

  try {
    await classPresence.save()
  } catch (error) {}

  // console.log(req.params.id)
  // const presenceList = await console.log(presenceList)
})

module.exports = router
