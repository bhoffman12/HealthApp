const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Appointment = require("../models/Appointment");
const moment = require('moment');
const Message = require("../models/Message");
const Doctor = require("../models/Doctor");



//REGISTER USER
exports.register = async (req, res) => {
    if (!req.body.username) return res.status(400).json({ message: "Username is required!" });
    if (!req.body.password) return res.status(400).json({ message: "Password is required!" });

    try {
        const userExist = await User.findOne({ username: req.body.username });
        if (userExist) {
            req.session.flash = 'User with same name already exist, Try another';
            return res.redirect('/register');
        }
        const { username, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const newUser = new User({ username, hash_password });
        await newUser.save();
        res.redirect('/');

    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

//LOGIN USER
exports.login = async (req, res) => {
    if (!req.body.username) return res.status(400).json({ message: "Username is required!" });
    if (!req.body.password) return res.status(400).json({ message: "Password is required!" });

    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.hash_password);
            if (isMatch) {
                const token = jwt.sign({ _id: user._id }, 'jhkh545dsd$#4hfejhejf', { expiresIn: "1d" });
                req.session.token = token;
                req.session.userId = user._id;
                req.session.role = user.role;
                req.session.userName = req.body.username;
                res.cookie("token", token, { expiresIn: "1d" });
                res.redirect('/home');
            } else {
                req.session.flash = 'Invalid password!';
                res.redirect('/');
            }
        } else {
            req.session.flash = 'User not Found!';
            res.redirect('/');
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

//LOGOUT USER
exports.logout = async (req, res) => {
    req.session.destroy((err) => res.redirect('/'));
};

//CRAETE APPOINTMENT
exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment({
            ...req.body,
            userId: req.session.userId,
            formatedDateTime: moment(req.body.datetime).format('MMM Do YYYY, h:mm a')
        });
        await newAppointment.save();
        res.redirect('/viewAppointment');
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

//GET APPOINTMENT BY ID
exports.getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('doctor', 'username');
        const doctorList = await Doctor.find({});
        res.render('updateAppointment', { appointment, doctorList });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

//UPDATE APPOINTMENT
exports.updateAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndUpdate(req.params.id, {
            ...req.body,
            formatedDateTime: moment(req.body.datetime).format('MMM Do YYYY, h:mm a')
        });
        res.redirect('/viewAppointment');
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

//SAVE USERS MESSAGE
exports.messages = async (req, res) => {
    try {
        const newMessage = new Message({
            ...req.body,
            userId: req.session.userId,
        });
        await newMessage.save();
        req.session.flash = 'Message submited successfully';
        res.redirect('/messages');
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};


//GET APPOINTMENT BY ID
exports.patientMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        console.log(messages)
        // const doctorList = await User.find({ role: 'doctor' }).select('username');
        // res.render('updateAppointment', { appointment, doctorList });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

//ADD DOCTOR
exports.addDoctor = async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.redirect('/add-doctor');
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};


//ADD DOCTOR
exports.cancelAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.redirect('/viewAppointment');
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
}
