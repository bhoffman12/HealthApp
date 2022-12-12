const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true, trim: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);