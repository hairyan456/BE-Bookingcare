import db from '../models/index';
import _ from 'lodash';

// CRUD Specialty
const getAllSpecialties = async () => {
    let listSpecialties = [];
    try {
        listSpecialties = await db.Specialty.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true,
            nest: true
        });

        if (listSpecialties && listSpecialties.length > 0) { // convert image tại server(thay vì convert ở FE như Doctor)
            listSpecialties = listSpecialties.map((item, index) => ({ ...item, image: item.image ? new Buffer(item.image, 'base64').toString('binary') : '' }))
            return {
                EM: 'Get list specialties success!',
                EC: 0,
                DT: listSpecialties
            }
        }
        else {
            return {
                EM: 'Cannot get list specialties because table in DB is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllSpecialties():', error);
        return {
            EM: `Something wrongs in Service  getAllSpecialties() `,
            EC: -2,
            DT: ''
        }
    }
}
const createNewSpecialty = async (inputData) => {
    try {
        if (!inputData.name || !inputData.image || !inputData.description || !inputData.contentMarkDown ||
            !inputData.contentHTML) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        else {
            let specialty = await db.Specialty.findOrCreate({
                where: { name: inputData.name.trim() },
                defaults: {
                    name: inputData.name.trim(),
                    image: inputData.image
                }
            });
            if (specialty && specialty[0]) {
                if (!specialty[1]) { //nếu Specialty đã tồn tại
                    return {
                        EM: 'This specialty has already exist!',
                        EC: 1,
                        DT: ''
                    }
                }
                else { // nếu chưa tồn tại => tạo Markdown cho specialty:
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML, contentMarkDown: inputData.contentMarkDown,
                        description: inputData.description, specialtyId: +specialty[0].id
                    });
                    return {
                        EM: 'Create new specialty success',
                        EC: 0,
                        DT: ''
                    }
                }
            }
            else {
                return {
                    EM: 'Cannot found specialty!',
                    EC: 2,
                    DT: ''
                }
            }
        }

    }
    catch (error) {
        console.log('>>> check error from createNewSpecialty():', error);
        return {
            EM: `Something wrongs in Service createNewSpecialty() `,
            EC: -2,
            DT: ''
        }
    }
}

// tìm chi tiết chuyên khoa theo tỉnh thành 
const getDetailSpecialtyById = async (id, location) => {
    try {
        if (!id || !location) {
            return {
                EM: 'Missing required params!',
                EC: 1,
                DT: ''
            }
        }
        let data = await db.Specialty.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'nameEn'],
            include: [
                { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkDown'] },
            ],
            raw: true,
            nest: true
        });
        if (!data) {
            return {
                EM: 'Cannot found specialty!',
                EC: 2,
                DT: ''
            }
        }
        let doctorSpecialty = [];
        if (location.toLowerCase() === 'ALL'.toLowerCase()) {
            doctorSpecialty = await db.Doctor_Infor.findAll({
                where: { specialtyId: id },
                attributes: ['doctorId', 'provinceId']
            })
        }
        else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
                where: { specialtyId: id, provinceId: location },
                attributes: ['doctorId', 'provinceId']
            })
        }
        data.doctorSpecialty = doctorSpecialty;
        return {
            EM: 'Get specialty success',
            EC: 0,
            DT: data
        }


    } catch (error) {
        console.log('>>> check error from getDetailSpecialtyById():', error);
        return {
            EM: `Something wrongs in Service getDetailSpecialtyById() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = { getAllSpecialties, createNewSpecialty, getDetailSpecialtyById }