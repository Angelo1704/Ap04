const Sequelize = require('sequelize')

class Appointments extends Sequelize.Model{
  static init(sequelize){
    super.init({
      physicianId: Sequelize.INTEGER,
      patientId: Sequelize.INTEGER,
      appointmentDate: Sequelize.DATE,
      description: Sequelize.STRING,
    },{
      sequelize,
    });
  }
}

module.exports = Appointments;
