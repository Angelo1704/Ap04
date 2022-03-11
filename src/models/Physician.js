const Sequelize = require('sequelize')

class Physician extends Sequelize.Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    },{
      sequelize,
    })
  }
}

module.exports = Physician
