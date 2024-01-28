const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')

router.route("/")
    .get(usersController.get_all_users)
    .post(usersController.create_new_user)
    .patch(usersController.update_user)
    .delete(usersController.delete_user)


router.route("/delete_all")
    .delete(usersController.delete_all_users)
module.exports = router



/*
    second route accessed via
    http://localhost:3000/users/delete_all
 */
