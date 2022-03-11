const Sequelize = require('sequelize')
const dbConfig = require('./config/dbconfig')

const Physician = require('../models/Physician')
const Patient = require('../models/Patient');
const Appointments = require('../models/Appointments');

const connection = new Sequelize(dbConfig)

Physician.init(connection);
Patient.init(connection);
Appointments.init(connection);


// Physician.associate(connection.models)

module.exports = connection
