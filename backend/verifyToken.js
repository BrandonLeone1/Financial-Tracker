import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

async function verifyToken(req, res, next) {
 const token = req.cookies.token;
    try { 
    if (!token) {
        return res.status(401).json({success: false, message: "Failed due to no token"})
    }

    const isTokenVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (!isTokenVerified) {
        return res.status(401).json({success: false, message: "Failed due to token not being verified"})
    }

    const decodedToken = jwt.decode(token);
    req.userID = decodedToken.userID
    next();  
    } catch (error) {
        res.status(401).json({success:false, message: "Failed to verify token"})
    }
    
}

export default verifyToken;