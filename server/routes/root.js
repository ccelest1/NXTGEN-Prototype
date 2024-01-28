const express = require('express')
const router = express.Router()
const path = require('path')

/*
    ^ = beginning of string
    $ - end of string only
    can request /, /index or, /index.html to direct to same page
    use .dirname to specify path to send browser to -> dir views where index.html is located
*/
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})
module.exports = router
