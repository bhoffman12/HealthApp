const jwt = require("jsonwebtoken");


exports.requireAuthenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: `Authorization required ${error}` });
    }
};

exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(400).json({ message: "User access denied" });
    }
    next();
};

