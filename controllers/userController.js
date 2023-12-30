const User = require('../models/User')
const Project = require('../models/Project')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
// const { default: lastDayOfDecade } = require('date-fns/fp/lastDayOfDecade/index')

/*
    @desc - get all users
    @router get/ users
    @access private
*/
const get_all_users = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users) {
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
const create_new_user = asyncHandler(async (req, res) => {
    const { first, last, username, email, password, roles, active } = req.body
    // confirm date
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({
            message: 'ERROR: Post method requires all fields'
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
        return res.status(409).json({ message: 'ERROR: A Duplicate Account has been Found' })
    }
    // add 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = { first, last, username, email, 'password': hashedPassword, roles, active }

    // create, store new user
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({
            message: `SUCCESS: User : ${username} has been created`
        })
    } else {
        res.status(400).json({
            message: ` ERROR: ! Invalid User Data ! -> User ${username} could not be created `
        })
    }
})

/*
    @desc - update user
    @router - patch/ user
    @access private
*/
const update_user = asyncHandler(async (req, res) => {
    const { id, first, last, username, email, password, roles, active } = req.body
    if (!id || !first || !last || !username || !email || !Array.isArray(roles) || !roles.length || !typeof active == 'boolean') {
        return res.status(400).json({
            message: 'ERROR! All fields are required'
        })
    }
    const user = await User.findById(id).lean().exec()
    if (!user) {
        return res.status(400).json({
            message: `ERROR: User ${username} not found`
        })
    }
    const duplicate = await User.findOne({ username }).lean().exec()
    const old_username = duplicate.username
    // attempting to test how to check for existing users based on several conditions - may not work
    const duplicate_alt = await User.findOne({
        $or: [
            { username: username },
            { $or: [{ first, last }] },
            { email: email }
        ]
    }).lean().exec();
    // allow updates to original user
    // avoid changing account that exists and is not the current user requesting updates
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({
            message: `ERROR: Duplicate username of ${username}`
        })
    }
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
    const updatedUser = await user.save()
    if (username != old_username) {
        res.json({
            message: `SUCCESS: User ${old_username} has been updated to ${updatedUser.username} with additional changes`
        })
    } else {
        res.json({
            message: `SUCCESS: User ${updatedUser.username} has been updated`
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
    // do not want to delete user if notes assigned
    const projects = await Project.findOne({
        user: id
    }).lean().exec()
    // if corresponding projects to user
    if (projects?.length) {
        return res.status(400).json({
            message: `ERROR: User ${username} has projects!`
        })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({
            message: `ERROR: User ${username} was not found`
        })
    }
    const deleted_user = await user.deleteOne()
    const deletion_reply = `SUCCESS: Username ${deleted_user.username} with ID ${deleted_user.id} has been deleted!`
    res.json(deletion_reply)
})

module.exports = {
    get_all_users,
    create_new_user,
    update_user,
    delete_user
}
