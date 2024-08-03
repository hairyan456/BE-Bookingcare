import nodemailer from "nodemailer";
require('dotenv').config();

const getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
<h3>Xin chào ${dataSend.patientName}!</h3>
<p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên: <a target="_blank " href="http://localhost:3000/">Bookingcare.vn</a></p>
<p>Thông tin đặt lịch khám bệnh:</p>
<div><b>Thời gian: ${dataSend.time}</b></div>
<div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
<div><b>Tại: ${dataSend.addressClinic}</b></div>
<p>Nếu các thông tin trên là đúng, vui lòng click vào đường link dưới đây để xác nhận và hoàn tất thủ tục đặt lịch khám 
bệnh</p>
<div><a href=${dataSend.redirectLink} target='_blank'>Click here</a></div>
<div>Xin chân thành cảm ơn.</div>
`
    }
    else if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you made an online medical appointment on: <a target="_blank " href="http://localhost:3000/">Bookingcare.vn</a></p>
        <p>Information on scheduling medical examinations:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <div><b>At: ${dataSend.addressClinic}</b></div>
        <p>If the above information is correct, please click on the link below to confirm and complete the appointment procedure
        sick</p>
        <div><a href=${dataSend.redirectLink} target='_blank'>Click here</a></div>
        <div>Sincerely thank.</div>
        `
    }
    return result;
}

const sendSimpleEmail = async (dataSend) => {
    //create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Hoàng Hải Vũ 👻" <hairyan789@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: (dataSend.language === 'vi') ? "Thông báo xác nhận đặt lịch khám bệnh - BookingCare"
            : 'Notice of confirmation of medical examination appointment - BookingCare', // Subject line
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

const getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
<h3>Xin chào ${dataSend.patientName}!</h3>
<p>Bạn nhận được email này vì đã hoàn tất khám bệnh trên: <a target="_blank " href="http://localhost:3000/">Bookingcare.vn</a></p>
<p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm dưới đây.</p>
<div>Xin chân thành cảm ơn.</div>
`
    }
    else if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you made an online medical appointment on: <a target="_blank " href="http://localhost:3000/">Bookingcare.vn</a></p>
        <p>Information about remedy examinations is attached bellow.</p>
        <div>Sincerely thank.</div>
        `
    }
    return result;
}

const sendAttachment = async (dataSend) => {
    //create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Hoàng Hải Vũ 👻" <hairyan789@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: (dataSend.language === 'vi') ? "Kết quả khám bệnh - BookingCare" : 'Notice of examination results - BookingCare', // Subject line
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    });
}

module.exports = { sendSimpleEmail, sendAttachment }