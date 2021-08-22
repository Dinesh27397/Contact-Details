const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
var uuid = require('uuid');
const storage = new  GridFsStorage({
    url: process.env.MONGO_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}${uuid.v4()}`;
            return filename;
        }
        return {
            bucketName: "photos",
            filename: `${uuid.v4()}`,
        };
    },
});

module.exports = multer({ storage });