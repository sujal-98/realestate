const Seller = require('../model/seller');
const express = require('express');
const router = express.Router();

router.get('/sellerById/:sellerId',async (req,res)=>{
    const id=req.params.sellerId;
    try{
        const seller=await Seller.findById(id).populate('userId');
        console.log("seller ",seller);
        if(seller){
            res.json(seller);
        }
        else{
            res.json({message:"Seller not found"});
        }
    }
    catch(error){
        console.log("Error ",error);
    }

})

module.exports = router;