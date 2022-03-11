'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Appointments",[
        {
          patientId: 1,
          physicianId: 1,
          appointmentDate: "2022-4-10",
          description: "Perna quebrada",
        },{
          patientId: 2,
          physicianId: 1,
          appointmentDate: "2022-4-12",
          description: "Dor intensa nas costas",
        },{
          patientId: 3,
          physicianId: 2,
          appointmentDate: "2022-4-22",
          description: "Torção no joelho",
        },{
          patientId: 4,
          physicianId: 2,
          appointmentDate: "2022-05-04",
          description: "Pulso aberto",
        },{
          patientId: 5,
          physicianId: 3,
          appointmentDate: "2022-3-15",
          description: "Miopia",
        },{
          patientId: 6,
          physicianId: 3,
          appointmentDate: "2022-3-28",
          description: "Crises de Asma",
        },
      ],{}
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Appointments", null, {})
  }
};
