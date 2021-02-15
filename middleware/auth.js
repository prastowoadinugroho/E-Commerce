 const jwt = require('jsonwebtoken');

 module.exports = function(req, res, next){
     
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({
            message: 'No token, authentication denied'
        })
    }

    //Verify Token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        req.status(401).json({
            message: 'Token is not valid'
        })
    }
 }