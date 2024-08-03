import express from 'express';
import userController from '../controllers/userController';
import allCodeController from '../controllers/allCodeController';
import doctorController from '../controllers/doctorController';
import scheduleController from '../controllers/scheduleController';
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';

const router = express.Router();

const initAPIRoutes = (app) => {
    // routes for Login - Register
    router.post("/login", userController.handleLogin);
    router.post("/register", userController.handleRegister);

    // routes for CRUD User:
    router.get('/users/read', userController.readFunc);
    router.post('/users/create', userController.createFunc);
    router.put('/users/update', userController.updateFunc);
    router.delete('/users/delete', userController.deleteFunc);

    // routes for AllCodes:
    router.get('/allcodes/read', allCodeController.readFunc);

    //  routes for Doctors:
    router.get('/doctors/read-by-limit', doctorController.readByLimitFunc);  // get top doctors at homepage
    router.get('/doctors/read', doctorController.readFunc);      // get all Doctors
    router.post('/doctors/save-infor-doctor', doctorController.postInforDoctor); //save doctor's markdown
    router.get('/doctors/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.get('/doctors/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.get('/doctors/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    router.post('/doctors/bulk-create-schedules', doctorController.bulkCreateSchedules);// save multiple schedule data
    router.get('/doctors/get-list-patients-for-doctor', doctorController.getListPatientForDoctor);
    router.post('/doctors/send-remedy', doctorController.sendRemedy);

    // routes for Schedules:
    router.get('/schedules/get-schedule-doctor-by-date', scheduleController.getScheduleDoctorByDate);

    // routes for Patient:
    router.post('/patient/booking-appoinment', patientController.postBookingAppoinment);  // đặt lịch khám bệnh
    router.post('/patient/verify-booking-appointment', patientController.postVerifyBookAppointment);

    // routes for Specialty:
    router.get('/specialty/read', specialtyController.readFunc);      // get all Specialties
    router.post('/specialty/create-new-specialty', specialtyController.createNewSpecialty);
    router.get('/specialty/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

    // routes for Clinic:
    router.get('/clinic/read', clinicController.readFunc);      // get all Clinics
    router.post('/clinic/create-new-clinic', clinicController.createNewClinic);
    router.get('/clinic/get-detail-clinic-by-id', clinicController.getDetailClinicById);

    return app.use("/api/v1/", router);
}

export default initAPIRoutes;