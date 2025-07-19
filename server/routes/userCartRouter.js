const router = require('express').Router();
const {cartItemsValidation,cartRetrivalValidation} = require('../middleware/userCartMiddleware');
const {UserCartController,UserCartRetrivalController} = require('../controllers/userCartController');
router.post('/userCart/addProducts', cartItemsValidation, UserCartController)
router.get('/userCart', cartRetrivalValidation,UserCartRetrivalController)


module.exports = router;