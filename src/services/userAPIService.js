import bcrypt from 'bcryptjs';
import db from '../models/index';
import { Op } from 'sequelize';
require('dotenv').config();

const salt = bcrypt.genSaltSync(10); //tham số để truyền vào BCrypt để hash pasword
const hashUserPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const checkEmailExisted = async (userEmail) => {
    let user = {};
    try {
        user = await db.User.findOne({
            where: {
                email: userEmail
            }
        });
        return user ? true : false;
    } catch (error) {
        console.log('>>> check error (checkEmailExisted):', error);
    }
}

const checkPhoneExisted = async (userPhone) => {
    let user = {};
    try {
        user = await db.User.findOne({
            where: {
                phoneNumber: userPhone
            }
        });
        return user ? true : false;
    } catch (error) {
        console.log('>>> check error (checkPhoneExisted):', error);
    }
}

const loginUser = async (userInfo) => {
    try {
        //nếu tồn tại Email hoặc Phone:
        if (await checkEmailExisted(userInfo.valueLogin) || await checkPhoneExisted(userInfo.valueLogin)) {
            let user = {};
            user = await db.User.findOne({
                attributes: ['id', 'email', 'password', 'roleId', 'firstName', 'lastName'],
                where: {
                    [Op.or]: [
                        { email: userInfo.valueLogin },
                        { phoneNumber: userInfo.valueLogin }
                    ]
                }
            });
            if (user) {
                if (bcrypt.compareSync(userInfo.password, user.password)) {
                    delete user.password; //không trả về password trong  Data
                    return {
                        EM: 'Login successfully',
                        EC: 0,
                        DT: user
                    }
                }
                else {
                    return {
                        EM: 'Wrong password!',
                        EC: 2,
                        DT: ''
                    }
                }
            }
        }
        else { //nếu email hoặc phone k tồn tại:
            return {
                EM: 'Email or phone is not existed',
                EC: 1,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error loginUser():', error);
        return {
            EM: `Something wrong in loginUser() `,
            EC: -2,
            DT: ''
        }
    }
}

const registerNewUser = async (rawUserData) => {
    try {
        if (!rawUserData.email || !rawUserData.phoneNumber || !rawUserData.firstName || !rawUserData.lastName
            || !rawUserData.password) {
            return {
                EM: 'Missing required params',
                EC: 1,
                DT: ''
            }
        }
        //check email/phonenumber are existed
        if (await checkEmailExisted(rawUserData.email)) {
            return {
                EM: 'Email is already existed',
                EC: 1
            }
        }
        if (await checkPhoneExisted(rawUserData.phone)) {
            return {
                EM: 'Phone number is already existed',
                EC: 1
            }
        }
        //check password length
        if (rawUserData.password && rawUserData.password.length < 3) {
            return {
                EM: 'Password must have more than 3 letters',
                EC: 2,
                DT: '',
            }
        }

        //create new user
        await db.User.create({
            email: rawUserData.email,
            password: hashUserPassword(rawUserData.password),
            firstName: rawUserData.firstName,
            lastName: rawUserData.lastName,
            phoneNumber: rawUserData.phoneNumber,
            roleId: 'R3'
        })

        return {
            EM: 'Created successfully!',
            EC: 0
        }

    } catch (error) {
        console.log('>>> check error registerNewUser():', error);
        return {
            EM: `Something wrong in registerNewUser() `,
            EC: -2
        }
    }
}

// CRUD Users
const getAllUsers = async () => {
    let listUsers = [];
    try {
        listUsers = await db.User.findAll({
            attributes: { exclude: ['password', 'image'] },
            include: [
                { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
            ],
            raw: true,
            nest: true
        });

        if (listUsers && listUsers.length > 0) {
            return {
                EM: 'Get list users success!',
                EC: 0,
                DT: listUsers
            }
        }
        else {
            return {
                EM: 'Cannot get list users because table in DB is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>> check error from getAllUsers():', error);
        return {
            EM: `Something wrongs in Service  getAllUsers() `,
            EC: -2,
            DT: ''
        }
    }
}

// Pagination:
const getUsersWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        let { count, rows } = await db.User.findAndCountAll({ //count: tổng số records trong Database
            // rows: các records tương ứng của page đó 
            order: [['id', 'DESC']],
            attributes: { exclude: ['password', 'image'] },
            include: [
                { model: db.Allcode, as: 'roleData', attributes: ['valueEn', 'valueVi'] },
            ],
            offset: offset,
            limit: limit,
            raw: true,
            nest: true
        })
        let totalPages = Math.ceil(count / limit);  // số pages có thể chia được 
        return {
            EM: `success`,
            EC: 0,
            DT: {
                totalRows: count,
                totalPages: totalPages,
                users: rows
            }
        }
    } catch (error) {
        console.log('>>> check error from getUsersWithPagination():', error);
        return {
            EM: `Something wrongs in Service  getUsersWithPagination() `,
            EC: -2,
            DT: ''
        }
    }
}

const createNewUser = async (rawData) => {
    try {
        // nếu không truyền email hay phoneNumber:
        if (!rawData.email || !rawData.phoneNumber) {
            return {
                EM: 'Email or phoneNumber not must be empty!',
                EC: 1,
                DT: ''
            }
        }
        // check Email & Phone existed
        if (await checkEmailExisted(rawData.email)) {
            return {
                EM: 'Email is already existed',
                EC: 1,
                DT: 'email'
            }
        }
        if (await checkPhoneExisted(rawData.phoneNumber)) {
            return {
                EM: 'Phone is already existed',
                EC: 1,
                DT: 'phoneNumber'
            }
        }
        //check password length
        if (rawData.password && rawData.password.length < 3) {
            return {
                EM: 'Password must have more than 3 letters',
                EC: 1,
                DT: 'password',
            }
        }
        await db.User.create({ ...rawData, password: hashUserPassword(rawData.password), image: rawData.avatar });
        return {
            EM: 'Created successfully!',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        console.log('>>> check error from createNewUser():', error);
        return {
            EM: `Something wrongs in Service createNewUser() `,
            EC: -2,
            DT: ''
        }
    }
}

const updateUser = async (rawData) => {
    try {
        if (!rawData.id || !rawData.roleId || !rawData.positionId || !rawData.gender) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }
        let user = await db.User.findOne({ where: { id: rawData.id }, raw: false });
        if (user) {
            //nếu update phoneNumber mà phone đã tồn tại:
            if (await checkPhoneExisted(rawData.phoneNumber)) {
                return {
                    EM: 'Phone number is existed!',
                    EC: 1,
                    DT: 'phoneNumber'
                }
            }
            await user.update({ //nếu có tham số nào k truyền, thì sẽ k update cột đó
                firstName: rawData.firstName,
                lastName: rawData.lastName,
                phoneNumber: rawData.phoneNumber,
                address: rawData.address,
                gender: rawData.gender,
                positionId: rawData.positionId,
                roleId: rawData.roleId,
                image: rawData.avatar
            })
            return {
                EM: 'Updated success',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'User is not existed!',
                EC: -1,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error from updateUser():', error);
        return {
            EM: `Something wrongs in Service  updateUser() `,
            EC: -2,
            DT: ''
        }
    }
}

const deleteUser = async (userId) => {
    try {
        if (!userId) {
            return {
                EM: 'Missing required parameter!',
                EC: 1,
                DT: ''
            }
        }
        let user = await db.User.findOne({ where: { id: userId } });
        if (user) {
            //hàm destroy() chỉ dùng cho Sequelize Object. Do đã config trả về raw:true ở config.json nên k dùng destroy được
            // await user.destroy();
            await db.User.destroy({ where: { id: userId } }); //xóa ở Database
            return {
                EM: 'Delete successfully',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'User is not existed!',
                EC: -1,
                DT: ''
            }
        }
    } catch (error) {
        console.log('>>> check error from deleteUser():', error);
        return {
            EM: `Something wrongs in Service deleteUser() `,
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    loginUser, registerNewUser, checkEmailExisted, checkPhoneExisted, hashUserPassword, getAllUsers
    , createNewUser, updateUser, deleteUser, getUsersWithPagination
}