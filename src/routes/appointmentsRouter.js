const express = require('express')
const appointmentsRouter = express.Router()
const appointmentsController = require('../controllers/appointmentsController');
const auth = require("../middlewares/auth");

appointmentsRouter.post("/newAppointment", auth, appointmentsController.newAppointment);
appointmentsRouter.post("/searchAppointmentByPatientId", auth, appointmentsController.searchAppointmentByPatientId);
appointmentsRouter.post("/searchAppointmentByPhysicianId", auth, appointmentsController.searchAppointmentByPhysicianId);
appointmentsRouter.delete("/deleteAppointments/:id", auth, appointmentsController.deleteAppointments);

module.exports = appointmentsRouter;