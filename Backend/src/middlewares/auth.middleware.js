const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {StatusCodes} = require('http-status-codes')

async function authUser(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            msg : "Token is missing",
            success : true
        })
    }

    try{

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = decoded;

    next()

    }catch(err){

        return res.StatusCodes(StatusCodes.UNAUTHORIZED).json({
            msg : "Invalid token"
        })



    }

}

module.exports = {authUser}