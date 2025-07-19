const router = require('express').Router();
const {cartRetrivalValidation} = require("../middleware/userCartMiddleware");
const {userOrderCancleValidation,userOrderValidation} = require("../middleware/userOrderMiddleware");
const {UserOrderController,UserOrderRetrivalController,userOrderCancleController} = require('../controllers/userOrderController');
router.post('/userOrders/placeOrder', userOrderValidation, UserOrderController)
router.get('/userOrders', cartRetrivalValidation,UserOrderRetrivalController)
router.post('/cancleOrder', userOrderCancleValidation,userOrderCancleController);


module.exports = router;
