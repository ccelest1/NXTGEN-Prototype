//
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {

    // formatting dateTime object
    const dateTime = format(
        new Date(),
        'yyyyMMdd\tHH:mm:ss'
    )

    // every time log message is created we are involving dateTime (with tabs = \t), id for each log item, new message for each log
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    // check if dir exists, if it doesn't and we try to save it -> will return an error message
    try {
        // if dir doesn't exist in logs folder
        if (!fs.existsSync(
            path.join(__dirname, '..', 'logs')
        )) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (e) {
        console.log(e)
    }
}

// middleware has request, response, iter to move to next piece
const logger = (req, res, next) => {
    // text log that includes every request
    // * need to revise to only include logs with specific request methods
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

// exporting both fxns
module.exports = { logEvents, logger }
