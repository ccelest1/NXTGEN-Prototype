const { logEvents } = require('./logger')

// overwrite default error handler
const eHandler = (e, req, res, next) => {
    // modified from logger to include error name, message
    logEvents(`${e.name}: ${e.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(e.stack)

    // does response have status code then return code or if not default to 500 (generic error)
    const status = res.statusCode ? res.statusCode : 500
    res.status(status)
    res.json({
        message: e.message
    })

}

module.exports = eHandler
