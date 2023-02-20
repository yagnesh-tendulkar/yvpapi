const { ConnectionStates } = require("mongoose");
const multer = require("multer");
const  {GridFsStorage} = require("multer-gridfs-storage");
const { v4: uuidv4 } = require('uuid');
const storage = new GridFsStorage({
    url:"mongodb+srv://yagnesh:mlab123@cluster0-s1fce.mongodb.net/carrental?retryWrites=true&w=majority"|| process.env.mongoUrl,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        console.log("-------------------------------------",file,req.body)
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${file.originalname}`;
            return filename;
        }
        let id=uuidv4();
        req.id=id
        return  {
            bucketName: "photos",
            filename: id,
        };
    },
});

module.exports = multer({ storage });