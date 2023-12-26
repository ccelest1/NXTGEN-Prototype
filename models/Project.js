import mongoose from "mongoose"

// establishing project model
/*
    require id, connection to users that are authors/collaborators i.e. project.authors, type, description, is_private boolean, status, created, updated and title, completion_status (relation to statuses table)

    1. relation to project_types model
    2. relation to completion_status model
*/
const projectSchema = new mongoose.Schema({})

export const Project = mongoose.model("Project", projectSchema)
