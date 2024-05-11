const router=require('express').Router();
const User=require('../model/user')
const crypto=require("bcrypt")
const jwt=require('jsonwebtoken')


router.post("/register",async(req,res)=>{
    const newuser=new User({
        username:req.body.username,
        email:req.body.email,
        password:crypto.AES.encrypt(req.body.password,process.env.secretphrase).toString()
    });
    try{
    const saved=await newuser.save();
    res.status(201).json(saved)}
    catch(err){
        res.status(500).json(err);
    }
})

//login route
router.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        
        if (!user) {
            return res.status(401).json("Wrong credentials1");
        }

        const hash = crypto.AES.decrypt(user.password, process.env.secretphrase);
        let originalpass = hash.toString(crypto.enc.Utf8);

        if (originalpass !== req.body.password) {
            return res.status(401).json("Wrong credentials2");
        }
        res.status(200).json("Login Successfull");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports=router;