import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


async function generateTokenAndSetCookie (userID, res) {

    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 * 7
    });

}


export default generateTokenAndSetCookie;