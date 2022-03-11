'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Physicians",[
        {
          name: "João Oliveira da Silva",
          email: "joãooliveira@gmail.com",
          password: "joão123",
        },{
          name: "José da silva",
          email: "josesilva28@gmail.com",
          password: "silva321",
        },{
          name: "Felipe de Souza Guimarães",
          email: "felipeguimaraes@gmail.com",
          password: "fsg84",
        },
      ],{}
    )

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Physicians", null, {})
  }
};
