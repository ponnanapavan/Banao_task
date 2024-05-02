

import jwt from 'jsonwebtoken';
import User from './models/userModel.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken; // Access cookies directly from the request object

        if (!token) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        const decodejwt = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodejwt.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Error in protectRoute:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default protectRoute;
