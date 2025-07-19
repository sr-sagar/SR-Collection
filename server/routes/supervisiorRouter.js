const router = require('express').Router();
const {userFetchController,supervisiorLogInController, userNewRoleSetController, userNewOrderStatusController, orderFetchController, userNewOrderDeliveryDateController, userNewOrderNumberController, deleteProductsController} = require('../controllers/supervisiorController')
const {userFetchAuthentication, supervisiorLoginAuthentication, userNewRoleSetAuthentication, userNewOrderStatusAuthentication, userNewOrderDeliveryDateAuthentication, userNewOrderNumberAuthentication, deleteProductsAuthentication} = require('../middleware/supervisiorMiddleware')
router.post('/login', supervisiorLoginAuthentication,supervisiorLogInController)
router.get('/adminAccess', userFetchAuthentication,userFetchController)
router.post('/userRoleChange', userNewRoleSetAuthentication,userNewRoleSetController);
router.post('/userOrderStatusChange', userNewOrderStatusAuthentication,userNewOrderStatusController);
router.get('/userOrders', userFetchAuthentication,orderFetchController)
router.post('/userOrderDeliveryDateChange', userNewOrderDeliveryDateAuthentication,userNewOrderDeliveryDateController)
router.post('/userOrderNumberChange', userNewOrderNumberAuthentication,userNewOrderNumberController)
router.post('/deleteProduct', deleteProductsAuthentication, deleteProductsController)


module.exports = router