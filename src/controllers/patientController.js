const Patient = require('../models/Patient');
const Sequelize = require("sequelize");

module.exports = {
    async newPatient(req, res){
        const {name, email, phone } = req.body;
        if(!name || !email || !phone){
            res.status(400).json({ msg : "Dados obrigatorios não foram preenchidos"});
        }
        const isNewPatient = await Patient.findOne({
            where: {email},
        });
        if (isNewPatient)
            res.status(403).json({msg : "Paciente ja foi cadastrado"});
        else{
            const patient = await Patient.create({
                name,
                email,
                phone,
            }).catch((error) => {
                res.status(500).json({msg: "Não foi possivel inserir os dados"});
            });
            if(patient)
                res.status(201).json({msg : "Novo paciente foi adicionado"});
            else
                res.status(404).json({msg : "Não foi possivel cadastrar novo paciente"});
        }
    },
    async searchPatientByName(req, res){
        const name = req.body.name;
        if (!name)
        res.status(400).json({
            msg : "Parametro nome esta vazio",
        });
        const Op = Sequelize.Op;
        const patient = await Patient.findAll({
            where: {name:{[Op.like]: "%" + name + "%"} },
        });
        console.log(patient);
        if (patient){
            if(patient == "")
            res.status(400).json({msg: "Paciente não encontrado"});
            else res.status(200).json({patient});
        }else{
            res.status(404).json({
                msg: "Paciente não encontrado",
            });    
        }
    },

    async updatePatient(req, res){
        const patientId = req.body.id;
        const patient = req.body;
        if (!patientId) 
        res.status(400).json({ msg : "ID do paciente vazio"});
        else {
            const patientExists = await Patient.findByPk(patientId);
            if (!patientExists)
                res.status(404).json({msg: "Paciente não encontrado"});
            else {
                if (patient.name || patient.email){
                    await Patient.update(patient, {
                        where: { id: patientId},
                    });
                    return res.status(200).json({msg : "Paciente atualizado com sucesso"});
                }else
                return res.status(400).json({msg : "Campos obrigatórios não preenchidos"});
            }    
        }
    },

};