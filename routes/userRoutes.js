const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')

router.route("/")
    .get(usersController.get_all_users)
    .post(usersController.create_new_user)
    .patch(usersController.update_user)
    .delete(usersController.delete_user)

module.exports = router
