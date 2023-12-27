import mongoose from "mongoose"
const userSchema = require('./User')
// establishing project model
/*
    require id, connection to users that are authors/collaborators i.e. project.authors, type, description, is_private boolean, status, created, updated and title, completion_status (relation to statuses table)

    1. relation to project_types model
    2. relation to completion_status model

    Need to figure out project types in order to determine how each will look visually
*/
const projectType = new mongoose.Schema({

})
const projectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: {
        type: [userSchema],
        default: 1  //need this to be defaulted to the user who is creating project i.e owner
    },
    // if private project
    requests: {
        type: [userSchema],
    }
})

export const Project = mongoose.model("Project", projectSchema)
