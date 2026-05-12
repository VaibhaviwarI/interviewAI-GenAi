const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const blacklistModel = require('../models/blacklist.model')

async function registerUserController(req, res) {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "All fields are required",
                success: false
            })
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Account already exists with this username or email",
                success: false
            })
        }

        const hashed = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashed
        })

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET)

        res.cookie("token", token);

        return res.status(StatusCodes.CREATED).json({
            message: "User successfully created",
            success: true
        })

    } catch (error) {

        console.log("Error in connecting to the user")

        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error in creating the user",
            success: false
        })

    }

}


async function loginUserController(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "All fields are required",
                success: false
            })
        }

        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "User with this email does not exists",
                success: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "Username or password is incorrect",
                success: false
            })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, { expiresIn: "1d" })


        res.cookie("token", token);

        res.status(StatusCodes.ACCEPTED).json({
            msg: "User logged in successfully",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {

        console.log("Error in login controller")

        return res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Error in logging in",
            success: false
        })

    }

}


async function userLogoutController(req,res){

    const token = req.cookies.token || req.headers.authorization.split(" ") [ 1 ]

    if(token){

    await blacklistModel.create({
        token 
    })

    }

    res.clearCookie("token")

    res.status(StatusCodes.CREATED).json({
        msg : "User logged out successfully"
    })

}

async function getMeController(req,res){

    const user = await userModel.findById(req.user.id)

    const isTokenBlacklisted = await blacklistModel.findOne( {
        token
    })

    if(isTokenBlacklisted){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            msg : "Already logged out"
        })
    }



    res.status(200).json({
        message : "User details fetched successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }

    })

}

module.exports = {
    registerUserController,
    loginUserController,userLogoutController,getMeController
}