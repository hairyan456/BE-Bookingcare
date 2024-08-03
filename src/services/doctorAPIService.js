import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailAPIService from '../services/emailAPIService';

const MAX_NUMBER_SCHEDULES = process.env.MAX_NUMBER_SCHEDULES;

// CRUD Doctors
const getLimitDoctors = async (limit) => {
    let listDoctors = [];
    try {
        listDoctors = await db.User.findAll({
            limit: limit,
            where: { roleId: 'R2' },
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['password'] },
            include: [
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                {
                    model: db.Doctor_Infor, attributes: ['specialtyId'],
                    include: [
                        { model: db.Specialty, attributes: ['name', 'nameEn'] }
                    ]
                }
            ],
            raw: true,
            nest: true,
        });
        if (listDoctors && listDoctors.length > 0) {
            return {
                EM: 'Get list doctors success!',
                EC: 0,
                DT: listDoctors
            }
        }
        else {
            return {
                EM: 'Cannot get list doctors because table in DB is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getLimitDoctors():', error);
        return {
            EM: `Something wrongs in Service  getLimitDoctors() `,
            EC: -2,
            DT: ''
        }
    }
}

const getAllDoctors = async () => {
    let listDoctors = [];
    try {
        listDoctors = await db.User.findAll({
            where: { roleId: 'R2' },
            order: [['createdAt', 'DESC']],
            attributes: { exclude: ['password', 'image'] },
            raw: true,
            nest: true,
        });
        if (listDoctors && listDoctors.length > 0) {
            return {
                EM: 'Get list doctors success!',
                EC: 0,
                DT: listDoctors
            }
        }
        else {
            return {
                EM: 'Cannot get list doctors because table in DB is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllDoctors():', error);
        return {
            EM: `Something wrongs in Service  getAllDoctors() `,
            EC: -2,
            DT: ''
        }
    }
}

const checkRequiredParams = (inputData) => {
    let arr = [
        "doctorId",
        "description",
        "contentHTML",
        "contentMarkDown",
        "action",
        "selectedPrice",
        "selectedPayment",
        "selectedProvince",
        "selectedSpecialty",
        "selectedClinic"
    ];
    let isValid = true;
    let element = '';
    for (let i = 0; i < arr.length; i++) {
        if (!inputData[arr[i]]) {
            isValid = false;
            element = arr[i];
            break;
        }
    }
    return { isValid, element };
}

const saveInforDoctor = async (inputData) => {
    try {
        let checkObj = checkRequiredParams(inputData);
        if (checkObj.isValid === false) {
            return {
                EM: `Missing required params:${checkObj.element}`,
                EC: 1,
                DT: ''
            }
        }
        // chia 2 trường hợp: CREATE or UPDATE cho Markdown
        if (inputData.action === 'CREATE') {
            await db.Markdown.create({
                contentHTML: inputData.contentHTML, contentMarkDown: inputData.contentMarkDown,
                doctorId: +inputData.doctorId, description: inputData.description
            });
        }
        else if (inputData.action === 'UPDATE') {
            let markdown = await db.Markdown.findOne({ where: { doctorId: inputData.doctorId }, raw: false });
            if (markdown) {
                await markdown.update({ //nếu có tham số nào k truyền, thì sẽ k update cột đó
                    contentHTML: inputData.contentHTML, contentMarkDown: inputData.contentMarkDown,
                    description: inputData.description
                });
            }
            else {
                return {
                    EM: `Markdown for doctor id-${inputData.doctorId} not existed`,
                    EC: 2,
                    DT: ''
                }
            }
        }

        // chia 2 trường hợp: CREATE or UPDATE cho Doctor_Infor
        let doctorInfor = await db.Doctor_Infor.findOne({
            where: { doctorId: +inputData.doctorId },
            raw: false
        });
        if (doctorInfor) {  // UPDATE doctor_infor
            await doctorInfor.update({ //nếu có tham số nào k truyền, thì sẽ k update cột đó
                priceId: inputData.selectedPrice, paymentId: inputData.selectedPayment, provinceId: inputData.selectedProvince,
                nameClinic: inputData.nameClinic, addressClinic: inputData.addressClinic, note: inputData.note,
                specialtyId: +inputData.selectedSpecialty, clinicId: +inputData.selectedClinic
            });
            return {
                EM: 'Updated doctor markdown & infor successfully!',
                EC: 0,
                DT: ''
            }
        }
        else {   // CREATE new doctor_infor
            await db.Doctor_Infor.create({
                doctorId: +inputData.doctorId, priceId: inputData.selectedPrice,
                paymentId: inputData.selectedPayment, provinceId: inputData.selectedProvince,
                nameClinic: inputData.nameClinic, addressClinic: inputData.addressClinic,
                note: inputData.note,
                specialtyId: +inputData.selectedSpecialty, clinicId: +inputData.selectedClinic
            });
            return {
                EM: 'Created doctor markdown & infor successfully!',
                EC: 0,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error from saveInforDoctor():', error);
        return {
            EM: `Something wrongs in Service saveInforDoctor() `,
            EC: -2,
            DT: ''
        }
    }
}

// dùng cho DetailDoctor.js, ManageDoctor.js
const getDetailDoctorById = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        let detailDoctor = await db.User.findOne({
            where: { id: id },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkDown'] },
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                {
                    model: db.Doctor_Infor, attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                    ]
                }
            ],
            raw: true,
            nest: true
        })
        if (!detailDoctor) {
            return {
                EM: 'This doctor is not existed!',
                EC: 1,
                DT: ''
            }
        }
        return {
            EM: 'Get detail doctor successfully!',
            EC: 0,
            DT: detailDoctor
        }
    } catch (error) {
        console.log('>>> check error from getInforDoctorById():', error);
        return {
            EM: `Something wrongs in Service getInforDoctorById() `,
            EC: -2,
            DT: ''
        }
    }
}

// DoctorExtraInfor.js , dùng để hiển thị doctor_infor
const getExtraInforDoctorById = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        let data = await db.Doctor_Infor.findOne({
            where: { doctorId: id },
            attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] },
            include: [
                { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                { model: db.Clinic, attributes: ['name', 'address'] },

            ],
            raw: true,
            nest: true
        })
        if (!data) {
            return {
                EM: 'This doctor infor not existed!',
                EC: 1,
                DT: ''
            }
        }
        return {
            EM: 'Get extra infor doctor successfully!',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log('>>> check error from getExtraInforDoctorById():', error);
        return {
            EM: `Something wrongs in Service getExtraInforDoctorById() `,
            EC: -2,
            DT: ''
        }
    }
}

// ProfileDoctor.js
const getProfileDoctorById = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        let detailDoctor = await db.User.findOne({
            where: { id: id },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            include: [
                { model: db.Markdown, attributes: ['description'] },
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                {
                    model: db.Doctor_Infor, attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                    ]
                },
            ],
            raw: true,
            nest: true
        })
        if (!detailDoctor) {
            return {
                EM: 'This doctor infor not existed!',
                EC: 1,
                DT: ''
            }
        }
        return {
            EM: 'Get profile doctor successfully!',
            EC: 0,
            DT: detailDoctor
        }
    } catch (error) {
        console.log('>>> check error from getProfileDoctorById():', error);
        return {
            EM: `Something wrongs in Service getProfileDoctorById() `,
            EC: -2,
            DT: ''
        }
    }
}

const bulkCreateSchedules = async (data) => {
    try {
        if (!data) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        };

        // data từ Client gửi về 
        if (data && data.length > 0) {
            data = data.map((item) => ({ ...item, maxNumber: MAX_NUMBER_SCHEDULES }))
        }

        // lấy những data đã tồn tại trong bảng Schedules: (doctorId, date)
        let existingSchedules = await db.Schedule.findAll({
            where: { doctorId: data[0].doctorId, date: data[0].date },
            attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
            raw: true
        })

        // 2024-07-14T07:06:46.128Z : new Date()
        // 1720940806129            : new Date().getTime()   (unix timestamp : Number)
        // Date khi lấy từ DB, Sequelize trả về định dạng 2024-07-14T07:06:46.128Z nên phải convert lại:
        if (existingSchedules && existingSchedules.length > 0) {
            existingSchedules = existingSchedules.map(item => ({ ...item, date: new Date(item.date).getTime() }))
        }

        // dùng hàm của lodash để so sánh, lọc ra những data không bị trùng trong DB:
        let toCreated = _.differenceWith(data, existingSchedules, (item1, item2) => {
            return item1.timeType === item2.timeType && item1.date === item2.date;
        })

        if (toCreated && toCreated.length > 0) {
            await db.Schedule.bulkCreate(toCreated);
            return {
                EM: 'Create schedules successfully',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'No different data to create!',
                EC: 1,
                DT: ''
            }
        }

    } catch (error) {
        console.log('>>> check error from bulkCreateSchedules():', error);
        return {
            EM: `Something wrongs in Service bulkCreateSchedules() `,
            EC: -2,
            DT: ''
        }
    }
}

const getListPatientForDoctor = async (doctorId, date) => {
    try {
        if (!doctorId || !date) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        let data = await db.Booking.findAll({
            where: { doctorId: doctorId, date: +date, statusId: 'S2' },  //date được truyền vào do lấy query trên URL nên sẽ có kiểu str   
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: db.User, as: 'patientData',
                    attributes: ['email', 'firstName', 'lastName', 'address'],
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                    ]
                },
                {
                    model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']
                }
            ],
            raw: true,
            nest: true
        })

        if (data && data.length > 0) {
            return {
                EM: `Get doctor's patients successfully`,
                EC: 0,
                DT: data
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
        console.log('>>> check error from getListPatientForDoctor():', error);
        return {
            EM: `Something wrongs in Service getListPatientForDoctor() `,
            EC: -2,
            DT: ''
        }
    }
}

const sendRemedy = async (inputData) => {
    try {
        if (!inputData.email || !inputData.doctorId || !inputData.patientId || !inputData.timeType || !inputData.imgBase64) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        // UPDATE patient status (Confirmed -> DONE)
        let appointment = await db.Booking.findOne({
            where: {
                doctorId: inputData.doctorId,
                patientId: inputData.patientId,
                timeType: inputData.timeType,
                statusId: 'S2'
            },
            raw: false
        });

        if (appointment) {
            await appointment.update({ statusId: 'S3' });

            //Send email Remedy
            await emailAPIService.sendAttachment(inputData);
            return {
                EM: `Sending remedy success`,
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: `appointment is not existed`,
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error from getListPatientForDoctor():', error);
        return {
            EM: `Something wrongs in Service getListPatientForDoctor() `,
            EC: -2,
            DT: ''
        }
    }
}
module.exports = {
    getLimitDoctors, getAllDoctors, saveInforDoctor, getDetailDoctorById, bulkCreateSchedules,
    getExtraInforDoctorById, getProfileDoctorById, getListPatientForDoctor, sendRemedy
}