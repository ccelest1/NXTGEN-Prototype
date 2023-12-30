const { User, User_Activities, Interests } = require('../models/User')
const { Project } = require('../models/Project')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
// const { default: lastDayOfDecade } = require('date-fns/fp/lastDayOfDecade/index')

/*
    @desc - get all users
    @router get/ users
    @access private
*/
const get_all_users = asyncHandler(async (req, res) => {
    // do not send password back
    const users = await User.find().select('-password').lean()
    // optional chaining, check if users exists
    if (!users?.length) {
        return res.status(400).json({
            message: 'ERROR: No users found in DB'
        })
    }
    res.json(users)
})

/*
    @desc - add user
    @router - post/ user
    @access private
*/
// want to add a check for spaces in input for any fields
// invalid types in fields, i.e. no integers in first, last, require passwords with more variety (idk)
const create_new_user = asyncHandler(async (req, res) => {
    const { first, last, username, email, password, roles, active } = req.body
    // confirm date
    if (!first || !last || !username || !email || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({
            message: 'ERROR: Post method requires all fields'
        })
    }
    // const duplicate = await User.findOne({ username }).lean().exec()
    // attempting to test how to check for existing users based on several conditions - may not work
    const duplicate = await User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    }).lean().exec();
    if (username === duplicate?.username) {
        return res.status(409).json({
            message: `ERROR: Account with username: ${duplicate.username} already exists. Please choose a different username.`
        })
    } else if (email === duplicate?.email) {
        return res.status(409).json({
            message: `ERROR: Account with email: ${duplicate.email} already exists. Please choose a different email.`
        })
    }
    // add 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = { first, last, username, email, 'password': hashedPassword, roles, active }

    // create, store new user
    const user = await User.create(userObject)
    if (user) {
        console.log(user)
        res.status(201).json({
            message: `SUCCESS: User : ${username} has been created.`
        })
    } else {
        res.status(400).json({
            message: ` ERROR: ! Invalid User Data ! -> User ${username} could not be created.`
        })
    }
})

/*
    @desc - update user
    @router - patch/ user
    @access private
*/
/*
    check possibility of user not being found
    check for duplicates, create new user and try to change to username of previous user
*/
const update_user = asyncHandler(async (req, res) => {
    const { id, first, last, username, email, password, roles, active } = req.body
    if (!id || !first || !last || !username || !email || !Array.isArray(roles) || !roles.length || !active || !typeof active == 'boolean') {
        return res.status(400).json({
            message: 'ERROR! All fields are required.'
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: `no user found with id:${id}`
        })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({
            message: `ERROR: User not found.`
        })
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec()
    const duplicateEmail = await User.findOne({ email }).lean().exec()
    // allow updates to original user
    // avoid changing account that exists and is not the current user requesting updates
    if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
        return res.status(409).json({
            message: `ERROR: Account with username: ${duplicateUsername.username} already exists. Please choose a different username.`
        })
    }
    if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
        return res.status(409).json({
            message: `ERROR: Account with email: ${duplicateEmail.email} already exists. Please choose a different email.`
        })
    }
    // need to implement routes that test if a user doesn't update any information
    // an if no changes were made route
    /*
    if (duplicateUsername && duplicateUsername?._id.toString() === id && ) {
        return res.status(409).json({
            message: `ERROR: Your desired username change: ${duplicateUsername.username} is the same as your existing one`
        })
    }

    if (duplicateEmail && duplicateEmail?._id.toString() === id) {
        return res.status(409).json({
            message: `ERROR: Your desired username change; ${duplicateEmail.email} is the same as your existing one`
        })
    }
    */
    user.first = first
    user.last = last
    user.username = username
    user.email = email
    user.roles = roles
    user.active = active
    // rehash new password if necessary
    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }
    console.log(user)
    const updatedUser = await user.save()
    if (duplicateUsername && username !== duplicateUsername.username) {
        res.json({
            message: `SUCCESS! Username updated to ${updatedUser.username} with any additional changes.`
        })
    } else {
        res.json({
            message: `SUCCESS! User: ${updatedUser.username} has been updated.`
        })
    }

})

/*
    @desc - remove user
    @router - delete/ user
    @access private
*/
const delete_user = asyncHandler(async (req, res) => {
    const { id, username } = req.body
    if (!id) {
        return res.status(400).json({
            message: 'ERROR: User ID is Required'
        })
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: `no user found with id: ${id}`
        })
    }
    // do not want to delete user if notes assigned
    const project = await Project.findOne({
        user: id
    }).lean().exec()
    // if corresponding projects to user
    if (project) {
        return res.status(400).json({
            message: `ERROR: User ${username} has projects!`
        })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({
            message: `ERROR: User ${username} was not found.`
        })
    }
    const deleted_user = await user.deleteOne()
    const deletion_reply = `SUCCESS: Username ${username} with ID ${id} has been deleted!`
    res.json(deletion_reply)
})

module.exports = {
    get_all_users,
    create_new_user,
    update_user,
    delete_user
}
