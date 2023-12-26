const mongoose = require('mongoose')

// establishing user model
const userSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A Password is required for a user profile']
    },
    roles: [{
        type: String,
        default: 'regular-user'
    }],
    is_active: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)
