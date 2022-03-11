const express = require('express')
const physicianRouter = require('./physicianRouter');
const patientRouter = require('./patientRouter');
const appointmentsRouter = require('./appointmentsRouter');
const router = express.Router()

router.get('/', (req, res) => {
  res.send("It's Working")
})

router.use('/physician', physicianRouter);
router.use('/patient', patientRouter);
router.use('/appointments',appointmentsRouter);

module.exports = router
