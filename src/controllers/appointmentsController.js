const Appointments = require('../models/Appointments');
const Patient = require('../models/Patient');
const Physician = require('../models/Physician');
const Sequelize = require("sequelize");

module.exports = {
    async newAppointment(req, res){
        const {physicianId, patientId, appointmentDate, description } = req.body;
        if(!physicianId || !patientId || !appointmentDate || !description ){
            res.status(400).json({ msg : "Dados obrigatorios não foram preenchidos"});
        }
        const havePhysician = await Physician.findOne({
            where: {id: physicianId},
        });
        const havePatient = await Patient.findOne({
            where: {id : patientId},
        });

        if (!havePhysician || !havePatient)
            res.status(400).json({msg : "Erro nos parametros do médico ou do paciente"});
        else{
            const appointments = await Appointments.create({
                physicianId,
                patientId,
                appointmentDate,
                description
            }).catch((error) => {
                res.status(500).json({msg: "Não foi possivel inserir os dados"});
            });
            if(appointments)
                res.status(201).json({msg : "Nova consulta foi adicionada"});
            else
                res.status(404).json({msg : "Não foi possivel cadastrar nova consulta"});
        }
    },
    async searchAppointmentByPatientId(req, res){
        const idPatient = req.body.id;
        if (!idPatient)
        res.status(400).json({
            msg : "Parametro id do paciente esta vazio",
        });
        const Op = Sequelize.Op;
        const appointment = await Appointments.findAll({
            where: {patientId: idPatient },
        });
        console.log(appointment);
        if (appointment){
            if(appointment == "")
            res.status(400).json({msg: "Consulta não encontrada"});
            else res.status(200).json({appointment});
        }else{
            res.status(404).json({
                msg: "Consulta não encontrada",
            });    
        }
    },
    async searchAppointmentByPhysicianId(req, res){
        const idPhysician = req.body.id;
        if (!idPhysician)
        res.status(400).json({
            msg : "Parametro id do médico esta vazio",
        });
        const Op = Sequelize.Op;
        const appointment = await Appointments.findAll({
            where: {physicianId: idPhysician },
        });
        console.log(appointment);
        if (appointment){
            if(appointment == "")
            res.status(400).json({msg: "Consulta não encontrada"});
            else res.status(200).json({appointment});
        }else{
            res.status(404).json({
                msg: "Consulta não encontrada",
            });    
        }
    },
    async deleteAppointments( req, res){
        const appointmentId = req.params.id;
        const deleteAppointment = await Appointments.destroy({
            where: {id: appointmentId },
        }).catch((error) => {
            res.status(500).json({msg: "Não foi excluir a consulta"});
        });
        if (deleteAppointment != 0)
            res.status(200).json({msg : "Consulta excluida com sucesso"});
        else res.status(404).json({msg: "Consulta não encontrada"});
    },
};