const { Schema, model } = require('mongoose')
const userSchema = require('./User')
const AutoIncrement = required('mongoose-sequence')(mongoose)

// establishing project model
/*
    require id, connection to users that are authors/collaborators i.e. project.authors, type, description, is_private boolean, status, created, updated and title, completion_status (relation to statuses table)

    1. relation to project_types model
    2. relation to completion_status model

    Need to figure out project types in order to determine how each will look visually
*/
/*
const projectStatus = new Schema({

})
const projectType = new Schema({

})
*/
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    collaborators: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: null  //need this to be defaulted to the user who is creating project i.e owner
    },
    // if private project
    requests: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: null
    },
},
    {
        timestamps: true
    }
)
projectSchema.plugin(AutoIncrement, {
    inc_field: 'project',
    id: 'project_nums',
    start_seq: 100
})

export const Project = model("Project", projectSchema)
