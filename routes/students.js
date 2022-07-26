const express = require('express')
const router = express.Router()

// all students route
router.get('/', (req, res) => {
  res.render('students/index')
})

// new student route
router.get('/new', (req, res) => {
  res.render('students/new')
})

// create student route
router.post('/', (req, res) => {
  res.send('Creating student')
})

module.exports = router
