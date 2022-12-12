const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    fname: String,
    lname: String,
    phone: String,
    email: String,
    datetime: Date,
});

const addAppointment = mongoose.model('Update', AppointmentSchema);
module.exports = addAppointment