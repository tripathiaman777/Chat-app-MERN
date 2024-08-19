import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{ //in gitbash:- openssl rand -base64 32
        expiresIn: '15d'
    } )

    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true, //prevent Xss attacks cross-site scripting attacks
        sameSite: "Strict", //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV != "development"
    })
    console.log("Work Done")
}

export default generateTokenAndSetCookie;