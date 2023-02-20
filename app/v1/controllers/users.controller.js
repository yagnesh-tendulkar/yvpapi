const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = require('../models/session.model');
const register = require('../models/register.model')
var fs = require('fs')
var conversion = require("phantom-html-to-pdf")();
let data = fs.readFileSync("./receipt.html")
var path = require('path')
var handlebars = require('handlebars');
exports.registerUser = function (req, res) {
    register.retrive({ _id: req.body._id }, (err, data) => {
        console.log(data)
        if (data.length == 0) {
            register.addUser(req.body, (err, data) => {
                res.status(200).send({ msg: "User added succesfully" })
            })
        } else {
            res.status(200).send({ msg: "This user already exists" })

        }

    })

};

exports.getAllUsers = function (req, res) {
    console.log("getusera");
    register.retrive({}, (err, data) => {
        console.log(err, data);
        res.send(data)
    })
};


exports.getPdf = async (req, res) => {
    var readHTMLFile1 = function (path, callback) {
        console.log("INSIDE READFILE FUNC", req.params.id)

        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {

                console.log("error", err)
                callback(err);
                throw err;
            }
            else {
                console.log("readFile done")

                callback(null, html);
            }
        });
    };
    readHTMLFile1(path.resolve('receipt.html'), async function (err, html) {
        var template = handlebars.compile(html);
        register.retrive({ _id: req.params.id }, async (err, data) => {
            console.log(err, data);
            var replacements = {
                ID: "1",
                Date: new Date(data[0].createdAt).toLocaleDateString(),
                name: data[0].name,
                phone: data[0]._id,
                amount: data[0].amount,
                collectedby: "Yagnesh"
            };
            let filename = data[0].name + ".pdf"
            var output = fs.createWriteStream('tmp/output.pdf')
            console.log(replacements);
            var htmlToSend = template(replacements);
            conversion({ html: htmlToSend }, async function (err, pdf) {
                console.log(pdf.logs);
                console.log(pdf.numberOfPages);
                await pdf.stream.pipe(output);
            });
            setTimeout(() => {
                res.download('./tmp/output.pdf', filename)
                // fs.unlink(filename)
            }, 2000);
        })
    })

}
exports.getUsersBySearch = function (req, res) {
    console.log(new Date(req.params.from + "T00:00:00.000Z"), new Date(req.params.to + "T23:59:00.000Z"))
    register.filterUsers({ createdAt: { $gte: new Date(req.params.from + "T00:00:00.000Z"), $lte: new Date(req.params.to + "T23:59:00.000Z") } }, (err, data) => {
        console.log(err, data)
        res.send(data)
    })
};