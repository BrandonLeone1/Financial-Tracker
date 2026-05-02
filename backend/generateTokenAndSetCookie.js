import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();


async function generateTokenAndSetCookie (userID, res) {

    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    res.status(200).json({success: true, message: "Generated token", token: token})

}


export default generateTokenAndSetCookie;