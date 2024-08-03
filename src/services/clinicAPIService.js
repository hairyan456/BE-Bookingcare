import db from '../models/index';
import _ from 'lodash';

// CRUD Clinic
const getAllClinics = async () => {
    let listClinics = [];
    try {
        listClinics = await db.Clinic.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true,
            nest: true
        });

        if (listClinics && listClinics.length > 0) { // convert image tại server(thay vì convert ở FE như Doctor)
            listClinics = listClinics.map((item, index) => ({ ...item, image: item.image ? new Buffer(item.image, 'base64').toString('binary') : '' }))
            return {
                EM: 'Get list clinics success!',
                EC: 0,
                DT: listClinics
            }
        }
        else {
            return {
                EM: 'Cannot get list clinics because table in DB is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllClinics():', error);
        return {
            EM: `Something wrongs in Service  getAllClinics() `,
            EC: -2,
            DT: ''
        }
    }
}

const createNewClinic = async (inputData) => {
    try {
        if (!inputData.name || !inputData.image || !inputData.address || !inputData.description || !inputData.contentMarkDown ||
            !inputData.contentHTML) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        else {
            let clinic = await db.Clinic.findOrCreate({
                where: { name: inputData.name.trim() },
                defaults: {
                    name: inputData.name.trim(),
                    address: inputData.address.trim(),
                    image: inputData.image
                }
            });
            if (clinic && clinic[0]) {
                if (!clinic[1]) { //nếu Clinic đã tồn tại
                    return {
                        EM: 'This clinic has already exist!',
                        EC: 1,
                        DT: ''
                    }
                }
                else { // nếu chưa tồn tại => tạo Markdown cho clinic:
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML, contentMarkDown: inputData.contentMarkDown,
                        description: inputData.description, clinicId: +clinic[0].id
                    });
                    return {
                        EM: 'Create new clinic success',
                        EC: 0,
                        DT: ''
                    }
                }
            }
            else {
                return {
                    EM: 'Cannot found clinic!',
                    EC: 2,
                    DT: ''
                }
            }
        }

    }
    catch (error) {
        console.log('>>> check error from createNewClinic():', error);
        return {
            EM: `Something wrongs in Service createNewClinic() `,
            EC: -2,
            DT: ''
        }
    }
}

// tìm chi tiết chuyên khoa: 
const getDetailClinicById = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        let data = await db.Clinic.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'address'],
            include: [
                { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkDown'] },
            ],
            raw: true,
            nest: true
        });
        if (!data) {
            return {
                EM: 'Cannot found clinic!',
                EC: 2,
                DT: ''
            }
        }
        let doctorClinic = [];
        doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: id },
            attributes: ['doctorId']
        })
        data.doctorClinic = doctorClinic;
        return {
            EM: 'Get clinic success',
            EC: 0,
            DT: data
        }


    } catch (error) {
        console.log('>>> check error from getDetailClinicById():', error);
        return {
            EM: `Something wrongs in Service getDetailClinicById() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = { getAllClinics, createNewClinic, getDetailClinicById }