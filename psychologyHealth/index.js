const express = require('express')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("connect-flash");
const app = new express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = process.env.PORT || 8000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://recepi:recepi123@cluster0.5xe8j.mongodb.net/Ecomm-App?retryWrites=true&w=majority', { useNewUrlParser: true })


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const { update } = require('./models/Updates.js')
const AddAppointment = require('./models/Updates.js')

app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.isLoggedIn = req.session.token ? true : false;
    res.locals.role = req.session.role;
    res.locals.username = req.session.userName;
    res.locals.suc_message = req.session.flash;
    next();
});


const index = require("./routes/index");
app.use("/", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
