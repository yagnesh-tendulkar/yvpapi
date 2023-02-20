//Requiring Mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Defining Schema
var loginSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  _id: {
    type: String,
    required: true

  },
  phoneNo: {
    type: Number,
    required: true

  },
  kyc: {
    type: Boolean,
    default: false

  },
},
  {
    timestamps: true
  }
);

// generating a hash
loginSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
loginSchema.methods.validPassword = function (password, password1) {
  return bcrypt.compareSync(password, password1);
};

//build a returnable user payload for brower to use
loginSchema.methods.buildUserPayload = function (user, password) {
  const payload = _.pick(user, ['_id', 'role', 'createdAt']);
  const token = jwt.sign(payload, 'superSecret', {
    expiresIn: "1d" // expires in 24 hours
  });
  const refreshToken = jwt.sign(payload, 'regreshTokenSecret', {
    expiresIn: "4d" // expires in 24 hours
  });
  return {
    "role": user.role,
    "name": user.firstName + " " + user.lastName,
    "email": user._id,
    "refreshToken": refreshToken,
    "token": token,
  };
}

//Exporting the file
// var User = module.exports = mongoose.model('user', loginSchema); //Binding schema to UserCollection

//Getting user Details By Id
module.exports.getUserByField = function (user, callback) {
  User.findOne(user, callback);
}

//Inserting user Details
module.exports.addUser = function (user, callback) {
  User.create(user, callback);
}

//update user details
module.exports.updateUser = function (user, updateObject, callback) {
  var query = {
    $set: updateObject
  }
  User.findOneAndUpdate(user, query, { new: true }, callback);
}

//Getting all users
module.exports.getAllUsers = function (data, users, callback) {
  User.find(data, users, callback).sort({ createdAt: -1 });
}

//Deleting user Details By Id
module.exports.deleteUserById = function (user, callback) {
  User.deleteOne(user, callback);
}
