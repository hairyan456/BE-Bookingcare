import scheduleAPIService from '../services/scheduleAPIService';

const getScheduleDoctorByDate = async (req, res) => {
    try {
        let data = await scheduleAPIService.getScheduleDoctorByDate(req.query.doctorId, req.query.date);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from getScheduleDoctorByDate():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

module.exports = { getScheduleDoctorByDate }