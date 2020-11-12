const express = require('express')

const router = express.Router()

const loginController = require('../controllers/controller.login')
const logoutController = require('../controllers/controller.logout')
const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware')
const controllerLoginAdmin = require('../controllers/controller.loginAdmin')

router.get('/logout', logoutController)
router.get('/login', redirectIfAuthenticatedMiddleware, loginController)
router.post('/login', redirectIfAuthenticatedMiddleware, controllerLoginAdmin)

module.exports = router
