const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        fname: { type: String, required: true, trim: true },
        lname: { type: String, required: true, trim: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);