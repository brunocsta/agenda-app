const mongoose = require('mongoose');

const HomeSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
    },
    phone: {
        type: Integer,

    }
})

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {

}

module.exports = Home