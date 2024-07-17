const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt=require('jsonwebtoken')



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
      return res.status(400).json({ error: "Please provide email and Password" });
    }
  
    try {
      const user = await User.findOne({ email: email });
      console.log(user); 
  
      if (!user) {
        return res.status(401).json({ error: "Wrong credentials" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Wrong credentials" });
      }
  
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.jwtsecret,
        { expiresIn: 30000000000 }
      );
      if(!accessToken){
        res.status(400).send({message: ""})
      }
      console.log(accessToken)
      res.setHeader('Set-Cookie', `token=${accessToken};  Max-Age=${30000000000}`);
      
      
      console.log("cookie created")
      console.log(user._doc);
  
      return res.status(200).send({ message: 'Login successful',userId:user._id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/check-auth', (req, res) => {
    console.log("checking")
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).send({ authenticated: false });
      }
    
      try {
        const verified = jwt.verify(token, process.env.jwtsecret);
        if (verified) {
          return res.status(200).send({ authenticated: true });
        }
      } catch (err) {
        return res.status(401).send({ authenticated: false });
      }
    });


module.exports = router;
