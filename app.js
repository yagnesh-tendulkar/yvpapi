const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
var config = require("./_config");
const dotenv = require('dotenv').config();
const environmant = app.settings.env;
const path = require('path');
const cors=require('cors')

var appv1 = require('./app.v1.js');

var port = process.env.PORT || 9000;
console.log("Application Environment : " + environmant);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(cors())
//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//V1
app.use('/v1', appv1);

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connecting to the DB at: " + config.mongoURI[app.settings.env]);
}, (error) => {
    console.log("Something went wrong!! ", error);
});


app.listen(port, () => {
    console.log("Server started on port: " + port);
})

// const AWS = require("aws-sdk");
// const s3 = new AWS.S3()
// async function test(){

//     await s3.putObject({
//         Body: JSON.stringify({key:"value"}),
//         Bucket: "cyclic-outstanding-veil-calf-ap-southeast-2",
//         Key: "tmp/output.pdf",
//     }).promise()
    
//     // get it back
//     let my_file = await s3.getObject({
//         Bucket: "cyclic-outstanding-veil-calf-ap-southeast-2",
//         Key: "tmp/output.pdf",
//     }).promise()
    
//     console.log(JSON.parse(my_file))
// }
// test()
module.exports = app;
