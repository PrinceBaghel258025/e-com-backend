const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


// check if the user provided a token and is the token valid
const loginCheck = async (req, res, next) => {
    try {
        let token = req.headers.token;   
        // console.log(req)
        // console.log(req.body)
        if(!token) {
            return res.status(403).json({message: "please login first!"})
        }
        token = token.replace("Bearer ", "");
        decode = jwt.verify(token, process.env.JWT_SECRET);
        /*
        **  storing the user info in req object
        */
    //    console.log("decode", decode)
        req.userDetails = decode;
        req.loggedInUserId = decode._id
        next();
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: "You must be logged in"
        })
    }
}

// check if the logged in user has passed their own token
const isAuth = async (req, res, next) => {
    let  loggedInUserId  = req.loggedInUserId;

    // console.log("loggedInUserId", loggedInUserId)
    // console.log("req.userDetails._id", req.userDetails._id)
    if (
        !loggedInUserId ||
        !req.userDetails._id ||
        loggedInUserId != req.userDetails._id
    ) {
        return res.status(403).json({ error: "You are not authenticate" });
    }
    next();
}


// checks if the logged In user is admin
const isAdmin = async (req, res, next) => {
    try{
        // console.log(req.loggedInUserId)
        const reqUser = await User.findById(req.loggedInUserId)
        // console.log(reqUser)
        if(reqUser.userRole === 0) {
            return res.status(403).json({ error: "Access Denied"})
        }
        next()
    }
    catch(err) {
        console.log(err)
        res.status(404).json({
            message: "Not an Admin"
        })
    }
}

module.exports = {
    isAdmin,
    isAuth,
    loginCheck
}