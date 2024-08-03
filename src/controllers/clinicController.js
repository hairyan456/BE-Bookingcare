import clinicAPIService from '../services/clinicAPIService';

// get all clinics from DB, URL: "/clinic/read"
const readFunc = async (req, res) => {
    try {
        let data = await clinicAPIService.getAllClinics();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from Clinic readFunc():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const createNewClinic = async (req, res) => {
    try {
        let data = await clinicAPIService.createNewClinic(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from createNewClinic():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const getDetailClinicById = async (req, res) => {
    try {
        let data = await clinicAPIService.getDetailClinicById(req.query.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from getDetailClinicById():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}
module.exports = {
    createNewClinic, readFunc, getDetailClinicById
}