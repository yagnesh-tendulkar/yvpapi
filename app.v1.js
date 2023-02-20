const passport = require("passport");
const passportJWT = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const express = require('express');

var app = express();

//controllers
var testController = require('./app/v1/controllers/test.controller.js');
var usersController = require('./app/v1/controllers/users.controller.js');
var excelController = require('./app/v1/controllers/excel.controller.js');


const passportStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'superSecret'
}, function (jwt_payload, next) {
    // usersController.findUser({ username: jwt_payload.username }).then(user => {
    next(null, "user");
    // }).catch((error) => {
    //     next(null, false);
    // });
});

//init passport strategy
passport.use(passportStrategy);

//handle browser options Request
function handleOptionsReq(req, res, next) {
    if (req.method === 'OPTIONS') { res.send(200) }
    else { next() }
}
// const uploadFile = require("./app/v1/middlewares/upload");

//test routes
app.get('/test', testController.test);

//unsecured application routes
// app.post('/login', usersController.login);
app.post('/user', usersController.registerUser);
app.get('/user', usersController.getAllUsers);
app.get('/user/search/:from/:to', usersController.getUsersBySearch);
app.get('/user/export', excelController.exportDataToExcel);

app.get('/receipt/:id', usersController.getPdf)

app.get('/', (req, res) => {
    console.log(req)
    res.send(true)
})
//secured routes - auth using user JWT rzp_test_mulfp2laWz0UiD tEfEic6ZpeYnxVwgVhPzWJIT
app.use('/api', handleOptionsReq, passport.authenticate('jwt', { session: false }));





module.exports = app;