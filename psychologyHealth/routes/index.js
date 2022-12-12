const express = require("express");
const express = require("express");
const router = express.Router();
const {
    register,
    login,
    logout,
    createAppointment,
    updateAppointment,
    getAppointment,
    messages,
    addDoctor,
    cancelAppointment,
    createPrescription,
    updatePrescription,
    cancelPrescription,
    getPrescription,
} = require('../controllers/user');
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Message = require("../models/Message");
const Prescription = require("../models/Prescriptions");
const User = require("../models/User");


router.get('/', (req, res) => {
    if (req.session.token) {
        res.redirect('/home');
    } else {
        res.render('index', { errorMsg: req.session.flash });
        req.session.destroy();
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', async (req, res) => {
    let userList;
    if (req.session.token) {
        userList =  await User.find({userId: req.session.userId});
        res.render('contact',{
        userList,
    });
    }else {
    res.redirect('/');
    }
});


router.get('/home', (req, res) => {
    const { token, userName, role } = req.session;
    if (token) {
        res.render('home', { userName, role });
    } else {
        res.redirect('/');
    }
});

router.get('/register', (req, res) => {
    if (req.session.token) {
        res.redirect('/home');
    } else {
        res.render('register', { errorMsg: req.session.flash });
        req.session.destroy();
    }
});

router.get('/viewAppointment', async (req, res) => {
    let appointmentList;
    if (req.session.token) {
        if (req.session.role === 'patient') {
            appointmentList = await Appointment.find({ userId: req.session.userId });
        }
        if (req.session.role === 'admin') {
            appointmentList = await Appointment.find({});
        }
        const doctorList = await Doctor.find({});
        res.render('appointments', {
            appointmentList,
            doctorList,
        });
    } else {
        res.redirect('/');
    }
});

router.get('/messages', (req, res) => {
    if (req.session.token) {
        req.session.flash = null;
        res.render('messages');
    } else {
        res.redirect('/');
    }
});



router.get('/add-doctor', (req, res) => {
    if (req.session.token) {
        res.render('addDoctor');
    } else {
        res.redirect('/');
    }
});

router.post('/add-doctor', addDoctor);

router.get('/patient-messages', async (req, res) => {
    if (req.session.token) {
        const messageList = await Message.find({ doctor: req.session.userId });
        res.render('messageList', { messageList });
    } else {
        res.redirect('/');
    }
});

router.post("/messages", messages);

router.get('/prescriptions', async (req, res) => {
    let prescriptionList;
    if (req.session.token) {
        if (req.session.role === 'patient') {
            prescriptionList = await Prescription.find({ userId: req.session.userId });
        }
        if (req.session.role === 'admin') {
            prescriptionList = await Prescription.find({});
        }
        const doctorList = await Doctor.find({});
        res.render('prescriptions', {
            prescriptionList,
            doctorList
        });
    } else {
        res.redirect('/');
    }
});

// USER ROUTE
router.post("/users/register", register);
router.post("/users/login", login);
router.get("/users/logout", logout);


//APPOINTMENT ROUTE
router.post("/appointment/create", createAppointment);
router.get("/cancel-appointment/:id", cancelAppointment);
router.get("/updateAppointment/:id", getAppointment);
router.post("/appointment/:id", updateAppointment);

//PRESCRIPTION ROUTE
router.post("/prescription/create", createPrescription);
router.get("/cancel-prescription/:id", cancelPrescription);
router.get("/updatePrescription/:id", getPrescription);
router.post("/prescription/:id", updatePrescription);


module.exports = router;
