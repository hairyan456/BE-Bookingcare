import db from '../models/index';
require('dotenv').config();
import { Op } from 'sequelize';
import emailAPIService from '../services/emailAPIService';
import { v4 as uuidv4 } from 'uuid';

const buildURLEmail = (doctorId, token) => {
    let result = '';
    result = `${process.env.REACT_URL}/patient/verify-booking-appointment?token=${token}&doctorId=${doctorId}`;
    return result;
}

// Đặt lịch mà ko cần Login (khi bấm confirm sẽ thêm thông tin ng dùng vào DB)
const postBookingAppoinment = async (inputData) => {
    try {
        // nếu không truyền email hay phoneNumber:
        if (!inputData.email || !inputData.phoneNumber || !inputData.doctorId || !inputData.timeType || !inputData.date
            || !inputData.fullName || !inputData.gender || !inputData.address) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        // UPSERT patient:
        let user = await db.User.findOrCreate({ //trả về 1 Array, gồm 1 Object user tìm thấy và biến true or false
            where: {
                [Op.or]: [
                    { email: inputData.email },
                    { phoneNumber: inputData.phoneNumber }
                ]
            },
            attributes: { exclude: ['password', 'image', 'createdAt', 'updatedAt'] },
            defaults: {
                firstName: inputData.fullName.split(' ').slice(1).join(' '),
                lastName: inputData.fullName.split(' ')[0],
                email: inputData.email,
                roleId: 'R3',
                phoneNumber: inputData.phoneNumber,
                gender: inputData.gender,
                address: inputData.address
            },
        });

        if (user && user[0]) {

            //nếu User đã tồn tại trong DB:
            //Nếu nhập đúng email nhưng ko đúng phone:
            if ((!user[1] && user[0].email === inputData.email) && !(!user[1] && user[0].phoneNumber === inputData.phoneNumber)) {
                return {
                    EM: 'This user is already exist, but phoneNumber not correct!',
                    EC: 1,
                    DT: 'phoneNumber'
                }
            }
            //Nếu nhập đúng phone nhưng ko đúng email:
            else if (!(!user[1] && user[0].email === inputData.email) && (!user[1] && user[0].phoneNumber === inputData.phoneNumber)) {
                return {
                    EM: 'This user is already exist, but email not correct!',
                    EC: 1,
                    DT: 'email'
                }
            }
            let token = uuidv4();
            let booking = await db.Booking.findOrCreate({
                where: { patientId: user[0].id, statusId: 'S2' }, //nếu bệnh nhân đã đặt 1 lịch trước đó, trong trạng thái 'Confirm'
                defaults: {
                    statusId: 'S1', // S1: New, S2: Confirmed, S3: Done
                    doctorId: +inputData.doctorId,
                    patientId: +user[0].id,
                    date: inputData.date,
                    timeType: inputData.timeType,
                    token: token
                }
            });
            if (booking && !booking[1]) {
                return {
                    EM: 'Patient already has booking appointment!',
                    EC: 2,
                    DT: ''
                }
            }
            await emailAPIService.sendSimpleEmail({
                receiverEmail: inputData.email,
                patientName: inputData.fullName,
                time: inputData.timeBooking,
                addressClinic: inputData.addressClinic,
                doctorName: inputData.doctorName,
                language: inputData.language,
                redirectLink: buildURLEmail(inputData.doctorId, token)
            });
            return {
                EM: user[1] === false ? 'Booking success (User existed)' : 'Booking success (Create new user)',
                EC: 0,
                DT: ''
            }
        }
    }
    catch (error) {
        console.log('>>> check error from postBookingAppoinment():', error);
        return {
            EM: `Something wrongs in Service postBookingAppoinment() `,
            EC: -2,
            DT: ''
        }
    }
}

const postVerifyBookAppointment = async (doctorId, token) => {
    try {
        if (!doctorId || !token) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        else {
            let appointment = await db.Booking.findOne({
                where: { doctorId: +doctorId, token: token, statusId: 'S1' },
                raw: false
            });
            if (appointment) {  //nếu tìm thấy lịch hẹn trong table Booking với status:'S1' => updated status:'S2" confirmed
                await appointment.update({
                    statusId: 'S2'
                });
                return {
                    EM: 'Confirmed appointment success',
                    EC: 0,
                    DT: ''
                }
            }
            else { // nếu ko tìm thấy lịch hẹn (sai URL), hoặc lịch hẹn đã được xác nhận rồi:
                return {
                    EM: 'Appointment has been actived or not existed',
                    EC: 2,
                    DT: ''
                }
            }
        }
    } catch (error) {
        console.log('>>> check error from postVerifyBookAppointment():', error);
        return {
            EM: `Something wrongs in Service postVerifyBookAppointment() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = { postBookingAppoinment, postVerifyBookAppointment }