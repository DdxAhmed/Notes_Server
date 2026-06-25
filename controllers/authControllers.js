import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// logic sign up
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body || {};

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }
        const userExist = await User.findOne({ $or: [{ email }, { username }] });
        if (userExist) {
            return res.status(400).json({ message: "user is already exist" });
        }
        const user = await User.create({ username, email, password });
        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// logic sign in
export const loginUser = async (req, res) => {
    const { username, password } = req.body || {};

    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "user not found or wrong password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            return res.status(401).json({ message: "user not found or wrong password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
