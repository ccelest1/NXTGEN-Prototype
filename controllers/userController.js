const User = require('../models/User')
const Project = require('../models/Project')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

/*
    @desc - get all users
    @router get/ users
    @access private
*/
const get_all_users = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
        return res.status(400).json({
            message: 'No users found in db'
        })
    }
    res.json(users)
})

/*
    @desc - add user
    @router - post/ user
    @access private
*/
const create_new_user = asyncHandler(async (req, res) => {
    const { first, last, username, email, password, roles } = req.body
    // confirm date
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({
            message: 'Post method requires all fields'
        })
    }
    // const duplicate = await User.findOne({ username }).lean().exec()
    // attempting to test how to check for existing users based on several conditions - may not work
    const duplicate = await User.findOne({
        $or: [
            { username: username },
            { $or: [{ first, last }] },
            { email: email }
        ]
    }).lean().exec();
    if (duplicate) {
        return res.status(409).json()
    }
})

/*
    @desc - update user
    @router - patch/ user
    @access private
*/
const update_user = asyncHandler(async (req, res) => {

})

/*
    @desc - remove user
    @router - delete/ user
    @access private
*/
const delete_user = asyncHandler(async (req, res) => {

})

module.exports = {
    get_all_users,
    create_new_user,
    update_user,
    delete_user
}
