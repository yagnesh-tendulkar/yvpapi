//Requiring Mongoose
var mongoose = require('mongoose');

//Defining Schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    collectedBy: {
        type: String
    }
},
    {
        timestamps: true
    });

var User = module.exports = mongoose.model('user', userSchema);
//Inserting user Details
module.exports.addUser = function (user, callback) {
    User.create(user, callback);
}

module.exports.retrive = function (user, callback) {
    User.find(user, callback);
}
module.exports.filterUsers = function (user, callback) {
    User.find(user, callback);
}
