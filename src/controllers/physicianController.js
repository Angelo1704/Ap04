const Physician = require('../models/Physician')

module.exports = {
  async listAllPhysician(req, res){
    const physician = await Physician.findAll({
      order: [["name", "ASC"]],
    }).catch((error) =>{
      res.status(500).json({ msg: "Falha na Conexão. "})
    })
    if(physician) res.status(200).json({ physician })
    else
      res.status(404).json({ msg: "Nao foi possivel encontrar Médico." })
  },

  async newPhysician(req, res){
    const { name, email, password } = req.body
    if(!name || !email || !password){
      res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos. "})
    }

    const isPhysicianNew = await Physician.findOne({
      where: { email }
    })

    if(isPhysicianNew)
      res.status(403).json({ msg: "Médico já foi cadastrado." })
    else {
      const physician = await Physician.create({
        name, email, password,
      }).catch((error) => {
        res.status(500).json({ msg: "Não foi possivel inserir os dados" })
      })
      if(physician)
        res.status(201).json({ msg: "Novo médico foi adicionado." })
      else
        res.status(404).json({ msg: "Não foi possivel cadastrar novo médico" })
    }
  },

  async deletePhysician(req, res){
    const physicianId = req.params.id
    const deletedPhysician = await Physician.destroy({
      where: { id: physicianId },
    }).catch(async (error) => {
      const physicianHasRef = await Physician.findOne({
        where: { id: physicianId  },
      }).catch((error) => {
        res.status(500).json({ msg: error })
      })
      if(physicianHasRef)
        return res.status(403).json({ msg: "O Médico tem consultas cadastradas"})
    })
    if(deletedPhysician !== 0 )
      res.status(200).json({ msg: "Médico excluido com sucesso." })
    else res.status(404).json({ msg: "Médico não encontrado" })
  },

  async updatePhysician(req, res){
    const physicianId = req.body.id
    const physician = req.body
    if(!physicianId) res.status(400).json({ msg: "ID do médico vazio" })
    else {
      const physicianExists = await Physician.findByPk(physicianId)
      if(!physicianExists)
        res.status(404).json({ msg: "Médico não encontrado" })
      else{
        if(physician.name || physician.email){
          await Physician.update(physician,{
            where: { id: physicianId }
          })
          return res.status(200).json({ msg: "Médico atualizado com sucesso" })
        }else
          return res.status(400).json({ msg: "Campos obrigatórios não preenchidos"})
      }
    }
  }
}
