const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');

// Register
router.post('/register', async (req, res) => {
  console.log(req.body);
  const { Name, email, Password } = req.body;

  if (!Name || !email || !Password) {
    return res.status(400).json({ error: "Please provide Name, email, and Password" });
  }
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log(hashedPassword)
    const newUser = new User({
      username: Name,
      email: email,
      password: hashedPassword
    });
    console.log("new user"+newUser)
    const savedUser = await newUser.save();
    console.log("user added")
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide Name and Password" });
    }
  
    try {
      const user = await User.findOne({ email: email });
      console.log(user); // Log the user to see if it's found
      
      if (!user) {
        return res.status(401).json({ error: "Wrong credentials" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Wrong credentials" });
      }
  
      console.log(user); // Log the user again
      res.status(200).json({ message: "Login Successful" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
