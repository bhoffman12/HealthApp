const mongoose = require('mongoose')
const Update = require('./models/Updates')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:
true});

var id = "62b27ca8374dbc665eb21665";
Update.findByIdAndDelete(id, (error, update) =>{
    console.log(error,update)
})