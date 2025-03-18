const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFilePath = path.join(__dirname, "users.json");

// Ensure the file exists
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "[]");
}

// Function to read users from the file
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Function to write users to the file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// API Endpoint: Register User
router.post("/register", (req, res) => {
    const { userName, email, password } = req.body;
    let users = readUsersFromFile();

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Add new user
    const newUser = { userName, email, password };
    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json({ message: "User registered successfully" });
});


router.post("/login", (req, res) => {
    const { email, password } = req.body;
    let users = readUsersFromFile();

    // Check if user exists and password matches
    const userExists = users.some((u) => u.email === email && u.password === password);
    
    if (userExists) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(401).json({ error: "Invalid email or password" });
    }
});

module.exports = router;
