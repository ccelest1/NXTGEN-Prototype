const mongoose = require('mongoose')

// establishing user model
/*
    is_active: allows us to show user status at given point or time
    last_logged_in: when has user last been on platform
    usage_history: track the number/dates a user has been on platform
    profile_photo: going to be hosted on aws via s3 urls
    need to add a last_logged_in timestamp

    1. create a relation to professional_levels
    2. create a relation to engineering_types
    3. create a relation to user_interests

    contemporaries: friends list (bi-directional)
    network: people you have worked with
    followers: people following you (uni-directional)
    following: people you are following (uni-directional)
    ^ placeholder of [Number] - Number referring to id's of said objects

*/
const user_ProfessionalLevel = new mongoose.Schema({

})
const user_EngineeringType = new mongoose.Schema({

})
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
    profile_photo: {
        type: String,
        required: false
    },
    background_image: {
        type: String,
        required: false
    },
    caption: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
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
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    projects: {
        type: mongoose.Schema.Types.ObjectId,
        default: 0
    },
    network: {
        type: [Number],
        default: 0
    }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema)
