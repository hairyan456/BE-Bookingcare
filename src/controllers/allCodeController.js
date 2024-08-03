import allCodeAPIService from '../services/allcodeAPIService';

const readFunc = async (req, res) => {
    try {
        let data = await allCodeAPIService.getAllCodes(req.query.type);
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

module.exports = { readFunc }