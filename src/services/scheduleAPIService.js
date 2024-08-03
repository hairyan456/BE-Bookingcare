import db from '../models/index';

const getScheduleDoctorByDate = async (doctorId, date) => {
    try {
        if (!doctorId || !date) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        let dataSchedules = await db.Schedule.findAll({
            where: { doctorId: doctorId, date: +date },  //date được truyền vào do lấy query trên URL nên sẽ có kiểu str   
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                {
                    model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'],
                    include: [
                        {
                            model: db.Doctor_Infor, attributes: ['doctorId', 'clinicId'],
                            include: [
                                { model: db.Clinic, attributes: ['name', 'address'] },
                            ]
                        }
                    ]
                }
            ],
            raw: true,
            nest: true
        })
        if (dataSchedules && dataSchedules.length > 0) {
            return {
                EM: `Get doctor's schedules successfully`,
                EC: 0,
                DT: dataSchedules
            }
        }
        else {
            return {
                EM: 'No data can found!',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getScheduleDoctorByDate():', error);
        return {
            EM: `Something wrongs in Service getScheduleDoctorByDate() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = { getScheduleDoctorByDate }