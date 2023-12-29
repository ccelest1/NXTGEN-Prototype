require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
// set port that will be used to run in development or run locally on 3500
const PORT = process.env.PORT || 3000
// import logger
const { logger, logEvents } = require('./middleware/logger')
const eHandler = require('./middleware/eHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
console.log(process.env.NODE_ENV)
connectDB()

app.use(logger)
// process json
app.use(express.json())
app.unsubscribe(cookieParser())
// cors w/ desired request options
app.use(cors(corsOptions))

/*
    index of web page @ '/'
    indicate to node where to find static files
*/
app.use('/', express.static(path.join(__dirname, '/public')))
/*
    establishing app routes
*/
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

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

// use at end before telling app to listen
app.use(eHandler)

//understand when mdb connected
mongoose.connection.once('open', () => {
    // tell app to start listening
    app.listen(PORT, () => console.log(` server running on port:${PORT} `))
    console.log('mongodb listening')
})

// if error with mdb connection
mongoose.connection.on('error', e => {
    console.log(e)
    logEvents(`${e.no}: ${e.code}\t${e.syscall}\t${e.hostname}`, 'mongoErrLog.log')
})
