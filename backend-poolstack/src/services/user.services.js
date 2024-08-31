import jwtProvider from "../config/jwtProvider.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";

// Function to create a new user
const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new Error(`User already exists with email ${email}`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to find a user by ID
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error(`User not found with userID: ${userId}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to find a user by email
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await findUserById(userId);

        if (!user) {
            throw new Error(`User not found with userID: ${userId}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUser = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message)
    }
}

export default { createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUser };
