import db from '../models/index';

// CRUD Allcodes
const getAllCodes = async (typeInput) => {
    let listAllcodes = [];
    try {
        if (!typeInput) {
            return {
                EM: 'Missing required parameters!',
                EC: 1,
                DT: listAllcodes
            }
        }
        listAllcodes = await db.Allcode.findAll({
            where: { type: typeInput },
            // raw: true            cấu hình query:{raw:true} ở file config.json
            nest: true
        });
        if (listAllcodes && listAllcodes.length > 0) {
            return {
                EM: 'Get list Allcodes success!',
                EC: 0,
                DT: listAllcodes
            }
        }
        else {
            return {
                EM: 'Cannot get list Allcodes because table in DB is empty',
                EC: 1,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllCodes():', error);
        return {
            EM: `Something wrongs in Service  getAllCodes() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = { getAllCodes }