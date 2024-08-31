import jwtProvider from "../config/jwtProvider.js"
import userServices from "../services/user.services.js"

const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const userId = await jwtProvider.getUserIdFromToken(token);
            const user = await userServices.findUserById(userId);
            req.user = user;
            next(); // ekhane hbe 
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("TOKEN NOT FOUND");
    }

    //ba ekhane hbe next();

}

export default  authenticate ;