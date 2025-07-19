const router = require('express').Router();
const {UserSignUp, UserLogIn, currentPasswordController, changePasswordController, UserRetrivalController, EditUserDetailsController} = require('../controllers/userController')
const {SignUpValidation,LogInValidation, currentPasswordValidation, changePasswordValidation, EditUserDetailsValidation} = require("../middleware/userAuthentication")
const { cartRetrivalValidation } = require("../middleware/userCartMiddleware")


router.post('/userLogIn', LogInValidation, UserLogIn)
router.post('/userSignUp', SignUpValidation, UserSignUp)
router.post('/userAccount/currentPassword', currentPasswordValidation,currentPasswordController)
router.post('/userAccount/changePassword', changePasswordValidation,changePasswordController)
router.get('/userAccount/userDetails', cartRetrivalValidation,UserRetrivalController)
router.post('/userAccount/userDetails', EditUserDetailsValidation,EditUserDetailsController)


module.exports = router;
