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


// Notifications adding

router.post('/addNotification',async (req,res)=>{
    const {recieverId,senderId,subject,message}=req.body;
    try{
        const seller=await Seller.findById(recieverId);
        const notificationObj={
            senderId:senderId,
            sub:subject,
            msg:message,
            read:false
            };
            seller.notifications.push(notificationObj);
            await seller.save();
            res.json({message:"Notification added successfully"});
            }
            catch(error){
                console.log("Error ",error);
            }
        })

//fetch notifications

router.get('/getNotifications/:sellerId', async (req, res) => {
    const sellerId = req.params.sellerId;
    try {
    const seller = await Seller.findById(sellerId).select('notifications');
            if (!seller) {
                    return res.status(404).json({ message: 'Seller not found' });
                }
        
                const read = seller.notifications.filter(notification => notification.read);
                const unread = seller.notifications.filter(notification => !notification.read);
        
                res.json({
                    Read: read,
                    unRead: unread
                });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });

//change status 
router.put('/changeReadStatus/:id', async (req, res) => {
    const sellerId = req.params.id;
    try {
        const seller = await Seller.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        seller.notifications.forEach(notification => {
            notification.read = !notification.read;
        });
        await seller.save();

        return res.status(200).json({ message: 'All notification statuses updated successfully', notifications: seller.notifications });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

        

module.exports = router;