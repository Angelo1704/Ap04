'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Patients",[
        {
          name: "Pedro de Oliveira",
          email: "pedrooliveira@gmail.com",
          phone: "(41) 9 9893-8943",
        },{
          name: "Patrick Santos",
          email: "patricksantos@outlook.com",
          phone: "(45) 9 9159-9748",
        },{
          name: "Bruno Siqueira",
          email: "brunosiq@hotmail.com",
          phone: "(45) 9 9489-9854",
        },{
          name: "Diego de Oliveira",
          email: "diego@gmail.com",
          phone: "(41) 9 9457-3478",
        },{
          name: "Rosilda Mari",
          email: "rosildamari@outlook.com",
          phone: "(45) 9 9867-4738",
        },{
          name: "Francisco Freitas",
          email: "francisco@hotmail.com",
          phone: "(45) 9 9556-9823",
        },
      ],{}
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Patients", null, {})
  }
};
