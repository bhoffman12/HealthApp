const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        patientName: { type: String, required: true, trim: true },
        patientBirth: { type: String, required: true, trim: true },
        prescriptionName: { type: String, required: true, trim: true },
        prescriptionDose: { type: String, required: true },
        doctor: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);