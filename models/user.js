//in order to create Cshema we require mongoos
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //1st Filed
    email: {
        type: String,
        required: true,
        unique: true
    },
    //2nd field
    password: {
        type: String,
        required: true
    },
    //3rd field
    name: {
        type: String,
        required: true
    }
}, {
    //using this we can store that when the data is created or updated
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;