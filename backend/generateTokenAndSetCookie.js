import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


async function generateTokenAndSetCookie (userID, res) {

    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    });

}


export default generateTokenAndSetCookie;