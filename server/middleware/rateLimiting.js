const rateLimit = require('express-rate-limit')

const generalRateLimiting = rateLimit({
    windowMS: 10 * 60 * 1000,
    max: 50,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after some time.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = generalRateLimiting;