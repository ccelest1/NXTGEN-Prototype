const allowedOrigins = require('./allowedOrigins')

// origin = lookup object, if origin exists in allowedOrigins or not origin (i.e Postman) can process requests to app
// 1st condition for successful, else return not allowed..
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions
