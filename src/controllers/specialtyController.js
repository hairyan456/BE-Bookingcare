import specialtyAPIService from '../services/specialtyAPIService';

// get all specialties from DB, URL: "/specialty/read"
const readFunc = async (req, res) => {
    try {
        let data = await specialtyAPIService.getAllSpecialties();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from readFunc():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const createNewSpecialty = async (req, res) => {
    try {
        let data = await specialtyAPIService.createNewSpecialty(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from createNewSpecialty():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const getDetailSpecialtyById = async (req, res) => {
    try {
        let data = await specialtyAPIService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from getDetailSpecialtyById():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}
module.exports = {
    readFunc, createNewSpecialty, getDetailSpecialtyById
}