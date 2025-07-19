const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/productImage/');
        
    },
    filename: function (req, file,cb ) {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname,ext)
        const safebaseName = basename.replace(/\s+/g, "-")
        const name = `${safebaseName}-${Date.now()}${ext}`;
        cb(null, name);
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 5 * 1024 * 1024},
})

const handleMulterUpload = upload.array('image');
module.exports = {handleMulterUpload};
