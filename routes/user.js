const express = require('express');
const userRoutes = express.Router();
const userModel = require('../models/user'); // Adjust the path to your user model file
const bcrypt = require('bcrypt');

// Define a route to create a new user (signup)
userRoutes.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Fields cannot be empty"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            message: "Account created successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while adding the user."
        });
    }
});

// Define a route to handle user login
userRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json({
                status: true,
                username: username,
                message: "User logged in successfully"
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Invalid username or password"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Login failed"
        });
    }
});

module.exports = userRoutes;