const express = require('express')
const appointmentsRouter = express.Router()
const appointmentsController = require('../controllers/appointmentsController');

appointmentsRouter.post("/newAppointment",appointmentsController.newAppointment);
appointmentsRouter.post("/searchAppointmentByPatientId",appointmentsController.searchAppointmentByPatientId);
appointmentsRouter.post("/searchAppointmentByPhysicianId",appointmentsController.searchAppointmentByPhysicianId);
appointmentsRouter.delete("/deleteAppointments/:id",appointmentsController.deleteAppointments);

module.exports = appointmentsRouter;