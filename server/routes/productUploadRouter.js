const router = require('express').Router();
const { handleProductMiddleware } = require('../middleware/productUploadMiddleware');
const { handleMulterUpload } = require('../middleware/productUploadMulter')
const { productUploadController,productRetrivalController } = require('../controllers/productUploadController');

router.post('/',  handleMulterUpload,handleProductMiddleware, productUploadController);
router.get('/', productRetrivalController);
module.exports = router;

