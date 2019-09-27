const jwt = require('jsonwebtoken')


module.exports = {
    isAuth: (req, res, next) => {
        const token = req.header('auth-token')
        if(!token) return res.status(401).json({
            status: 401,
            message: 'access denied'
        })

        try {
            const isVerif = jwt.verify(token, process.env.SECRET_KEY)
            req.user = isVerif
            next()
        }
        catch (err) { 
            res.status(400).json({
                status: 400,
                message: 'invalid token' 
            })
        }
    }
}