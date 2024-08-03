"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _allCodeController = _interopRequireDefault(require("../controllers/allCodeController"));
var _doctorController = _interopRequireDefault(require("../controllers/doctorController"));
var _scheduleController = _interopRequireDefault(require("../controllers/scheduleController"));
var _patientController = _interopRequireDefault(require("../controllers/patientController"));
var _specialtyController = _interopRequireDefault(require("../controllers/specialtyController"));
var _clinicController = _interopRequireDefault(require("../controllers/clinicController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var initAPIRoutes = function initAPIRoutes(app) {
  // routes for Login - Register
  router.post("/login", _userController["default"].handleLogin);
  router.post("/register", _userController["default"].handleRegister);

  // routes for CRUD User:
  router.get('/users/read', _userController["default"].readFunc);
  router.post('/users/create', _userController["default"].createFunc);
  router.put('/users/update', _userController["default"].updateFunc);
  router["delete"]('/users/delete', _userController["default"].deleteFunc);

  // routes for AllCodes:
  router.get('/allcodes/read', _allCodeController["default"].readFunc);

  //  routes for Doctors:
  router.get('/doctors/read-by-limit', _doctorController["default"].readByLimitFunc); // get top doctors at homepage
  router.get('/doctors/read', _doctorController["default"].readFunc); // get all Doctors
  router.post('/doctors/save-infor-doctor', _doctorController["default"].postInforDoctor); //save doctor's markdown
  router.get('/doctors/get-detail-doctor-by-id', _doctorController["default"].getDetailDoctorById);
  router.get('/doctors/get-extra-infor-doctor-by-id', _doctorController["default"].getExtraInforDoctorById);
  router.get('/doctors/get-profile-doctor-by-id', _doctorController["default"].getProfileDoctorById);
  router.post('/doctors/bulk-create-schedules', _doctorController["default"].bulkCreateSchedules); // save multiple schedule data
  router.get('/doctors/get-list-patients-for-doctor', _doctorController["default"].getListPatientForDoctor);
  router.post('/doctors/send-remedy', _doctorController["default"].sendRemedy);

  // routes for Schedules:
  router.get('/schedules/get-schedule-doctor-by-date', _scheduleController["default"].getScheduleDoctorByDate);

  // routes for Patient:
  router.post('/patient/booking-appoinment', _patientController["default"].postBookingAppoinment); // đặt lịch khám bệnh
  router.post('/patient/verify-booking-appointment', _patientController["default"].postVerifyBookAppointment);

  // routes for Specialty:
  router.get('/specialty/read', _specialtyController["default"].readFunc); // get all Specialties
  router.post('/specialty/create-new-specialty', _specialtyController["default"].createNewSpecialty);
  router.get('/specialty/get-detail-specialty-by-id', _specialtyController["default"].getDetailSpecialtyById);

  // routes for Clinic:
  router.get('/clinic/read', _clinicController["default"].readFunc); // get all Clinics
  router.post('/clinic/create-new-clinic', _clinicController["default"].createNewClinic);
  router.get('/clinic/get-detail-clinic-by-id', _clinicController["default"].getDetailClinicById);
  return app.use("/api/v1/", router);
};
var _default = exports["default"] = initAPIRoutes;