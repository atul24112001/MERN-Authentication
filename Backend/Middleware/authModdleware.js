import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password")
        next();
    } else {
        res.status(400).json({
            message: 'Not Authorized, No Token.',
            status: 'error',
            statusCode: 200,
        })
    }
}