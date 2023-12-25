const express = require('express')
const path = require('path')
const app = express()

// set port that will be used to run in development or run locally on 3500
const PORT = process.env.PORT || 3000
// import logger
const { logger } = require('./middleware/logger')

// using logger
app.use(logger)
// process json
app.use(express.json())

/*
    index of web page @ '/'
    indicate to node where to find static files
*/
app.use('/', express.static(path.join(__dirname, '/public')))
/*
    establishing app routes
*/
app.use('/', require('./routes/root'))

// tell app to start listening
app.listen(PORT, () => console.log(` server running on port:${PORT} `))

// handle all processes, including pages that aren't found or requests that are not handled properly
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 NOT FOUND' })
    } else {
        res.type('txt').send('404 NOT FOUND')
    }
})
