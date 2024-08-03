import doctorAPIService from '../services/doctorAPIService';

const readByLimitFunc = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let data = await doctorAPIService.getLimitDoctors(+limit);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from readByLimitFunc():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const readFunc = async (req, res) => {
    try {
        let data = await doctorAPIService.getAllDoctors();
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

const postInforDoctor = async (req, res) => {
    try {
        let data = await doctorAPIService.saveInforDoctor(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from postInforDoctor():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const getDetailDoctorById = async (req, res) => {
    try {
        let data = await doctorAPIService.getDetailDoctorById(req.query.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from getDetailDoctorById():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const getExtraInforDoctorById = async (req, res) => {
    try {
        let data = await doctorAPIService.getExtraInforDoctorById(req.query.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from getExtraInforDoctorById():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const getProfileDoctorById = async (req, res) => {
    try {
        let data = await doctorAPIService.getProfileDoctorById(req.query.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from getProfileDoctorById():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const bulkCreateSchedules = async (req, res) => {
    try {
        let data = await doctorAPIService.bulkCreateSchedules(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from bulkCreateSchedules():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const getListPatientForDoctor = async (req, res) => {
    try {
        let data = await doctorAPIService.getListPatientForDoctor(req.query.doctorId, req.query.date,);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from getListPatientForDoctor():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const sendRemedy = async (req, res) => {
    try {
        let data = await doctorAPIService.sendRemedy(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from sendRemedy():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}
module.exports = {
    readFunc, readByLimitFunc, postInforDoctor, getDetailDoctorById, bulkCreateSchedules,
    getExtraInforDoctorById, getProfileDoctorById, getListPatientForDoctor, sendRemedy
}