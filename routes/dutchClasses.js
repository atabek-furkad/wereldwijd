const express = require('express')
const router = express.Router()
const DutchClass = require('../models/dutchClass')

// all classes route
router.get('/', async (req, res) => {
  try {
    const dutchClasses = await DutchClass.find({})
    res.render('dutchClasses/index', {
      dutchClasses: dutchClasses,
    })
  } catch (error) {}
})

// new class route
router.get('/new', async (req, res) => {
  res.render('dutchClasses/new', { dutchClass: new DutchClass() })
})

// create class route
router.post('/', async (req, res) => {
  const newDutchClass = new DutchClass({
    name: req.body.name,
  })
  try {
    await newDutchClass.save()

    res.redirect(`dutch-classes/`)
  } catch (error) {}
})

module.exports = router
