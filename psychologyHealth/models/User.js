const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, trim: true, unique: true },
        hash_password: { type: String, required: true },
        role: { default: 'patient', type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);