import userAPIService from '../services/userAPIService';

const handleLogin = async (req, res) => {
    try {
        let data = await userAPIService.loginUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    catch (error) {
        console.log('error from handleLogin():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

const handleRegister = async (req, res) => {
    try {
        //service create user:
        let data = await userAPIService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        })

    } catch (error) {
        console.log('error from handleRegister():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

// get all users from DB, URL: "/users/read"
const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {  //nếu hiển thị phân trang
            let { page, limit } = req.query;
            let data = await userAPIService.getUsersWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
        else {
            let data = await userAPIService.getAllUsers();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }

    } catch (error) {
        console.log('>>> check error from readFunc():', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

// create a new user into DB, URL: "/users/create"
const createFunc = async (req, res) => {
    try {
        let data = await userAPIService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from createFunc():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

// update a user from DB, URL: "/users/update"
const updateFunc = async (req, res) => {
    try {
        let data = await userAPIService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from updateFunc():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}

// delete a user from DB, URL: "/users/delete"
const deleteFunc = async (req, res) => {
    try {
        let data = await userAPIService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log('>>> check error from deleteFunc():', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: '',
        })
    }
}
module.exports = { handleLogin, handleRegister, readFunc, createFunc, updateFunc, deleteFunc }