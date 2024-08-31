import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" })
    return token;
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY)
    return decodedToken.userId;
}

export default { generateToken, getUserIdFromToken };