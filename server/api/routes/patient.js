const express = require('express')
const router = express.Router()
const Authenticate = require('../middleware/Permission')
const ProfileController = require('../controllers/Patient/ProfileController')
const AppointmentController = require('../controllers/Patient/AppointmentController')
const findNearest=require('../controllers/Patient/SearchDoctor')

router.get('/me', Authenticate.isPatient, ProfileController.Me)
router.get('/doctorlist/:city/:special', Authenticate.isPatient, findNearest.findNearestDoctors)
router.post('/profile/:id/update/photo', Authenticate.isPatient, ProfileController.updatePhoto)
router.post('/profile/:id/update/bio', Authenticate.isPatient, ProfileController.updateBio)

router.get('/appointment/request/:id/index', Authenticate.isPatient, AppointmentController.GetAppointmentRequests)
router.post('/appointment/request', Authenticate.isPatient, AppointmentController.SetAppointmentRequest)


module.exports = router