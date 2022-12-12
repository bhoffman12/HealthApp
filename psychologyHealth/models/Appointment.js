const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        fname: { type: String, required: true, trim: true },
        lname: { type: String, required: true, trim: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        datetime: { type: String, required: true },
        doctor: { type: String, required: true },
        formatedDateTime: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);