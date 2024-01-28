# User Stories for PROTOTYPE

0. Users have id, username, email, first, last, updated_at, created_at, is_active, password, description, profile_photo, last_logged_in - timestamp that allows be to know when and frequency of usage
    - a. users have will have an association to a table containing their professional level (professional_level via user.id)
    - b. users will have an association to a table containing engineering types (engineering_type via user.id)
    - [MVP] c. users will have a connection to a table containing their engineering interests in order to serve up accurate suggestions

## Type
1. [ ] Users will have distinction of being either college, highschool, corporate, or professional devs i.e out of institution/self-starter/etc.
    - professional level
2. [ ] (engineering types) Users cam be software, non-software (me, design, ce, ie, ee), regular non-engineering user
    - engineering types

## Roles
3. [ ] (non-engineering types) Users can be admins or regular users
    - 'admin', 'regular-user'
4. [ ] (admin) provide method for removing user access if required

## Actions

### MVP - Solely Projects
5. [ ] a user may have an authored project
6. [ ] multiple users can collaborate on the same project
7. [ ] each project has an id, title, description, connection to users that are authors/collaborators i.e. project.authors, type, description, is_private boolean, status, created, updated, completion_status (relation to statuses table)
    - is_private allows for request process, if is_private is false all users will be able to view post, if is_private is true only approved users (including authors/collaborators) can view project
8. [ ] users have the ability to CRUD projects
9. [ ] included is the ability to add/remove collaborators

### Stretch Goal - Including Posts, Likes, Comments
8. [ ] Posts, likes, comments are assigned to users
9. [ ] Each post has an id, title, post_type_attributes (as below),
10. [ ] Each post has a post_type_attributes (a collection of tags enabling visual elements for post) that is auto assigned depending on its relation to the project_types table
11. [ ] Each post will provide a request option depending on status (true/false) of is_private attribute on project model

### Stretch Goal - Users
12. [ ] Users will have ability to update all pieces of information on their account
    - update password, username, email, description, types, interests, professional level

## Metrics
- [ ] implementation of helpful analytical metric system providing platform insights
- [ ] add suggestions based on user interests, professional level, type of engineer

## Pages
- [ ] Add a public facing page
    * idea is to have page with globe on left, middle [ log in on top, sign up on bottom], news/highlights on right
    * contact info on bottom?
- provide welcome page following login
