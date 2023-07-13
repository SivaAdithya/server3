const express = require('express');
const cors = require("cors");
const router = express.Router();
const schema = require('../model/schema_cart');
const schema_card = require('../model/schema_card');
const User = require('../model/schema_users');
const AuctionSchema = require('../model/AuctionSchema')
const CardDetSchema = require('../model/CardDetSchema')


router.get('/cart/:email',(req,res,next)=>{
    const emailToFind = req.params.email;
    AuctionSchema.find({buyer:emailToFind},(error,data)=>{
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    })
})

router.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    User.findByIdAndUpdate(userId, updatedUserData, { new: true }, (error, user) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
      } else if (user) {
        //console.log(user);
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  });
  

router.get('/item-details/:id',(req,res,next)=>{
    const id = req.params.id;
    schema.findById(id, (error,data)=>{
        if(error){
            return next(error);
        }
        else{
            //console.log(data);
            res.json(data);
        }
    })
})

router.get('/user-details/:email',(req,res,next)=>{
    const emailToFind = req.params.email;
    User.find({email:emailToFind},(error,data)=>{
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    })
})

router.get('/user-details/:email',(req,res,next)=>{
  const emailToFind = req.params.email;
  User.find({email:emailToFind},(error,data)=>{
      if(error){
          return next(error);
      }
      else{
          res.json(data);
      }
  })
})
router.delete('/del/:id', (req, res) => {
  const userId = req.params.id;

  AuctionSchema.findByIdAndDelete(userId, (error, deletedUser) => {
    if (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    } else if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});
router.get('/card',(req,res,next)=>{

    schema_card.find((error,data)=>{
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }); 
  
      if (user) {
        if (user.password === password) {
          res.status(200).json("exist");
        } else {
          res.status(201).json("wrongPassword");
        }
      } else {
        res.status(201).json("not exist");
      }
    } catch (error) {
        console.log(error.message);
      res.status(500).json("fail");
    }
  });

router.post('/signup', async (req, res) => {

    const { name, email, password, mobNo } = req.body;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    if (!emailRegex.test(email)) {
        res.status(201).json("invalidEmail");
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        res.status(201).json("invalidPassword");
        return;
    }

    // Mobile number validation
    const mobNoRegex = /^[0-9]{10}$/;
    if (!mobNoRegex.test(mobNo)) {
        res.status(201).json("invalidMobileNumber");
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
        res.status(201).json("exist");
        } else {
        const newUser = new User({ name, email, password, mobNo });
        await newUser.save();
        res.status(201).json("not exist");
        }
    } catch (error) {
        res.status(500).json("fail");
    }
})


const crt_det = async(req, res) => {
  try {
    //console.log(req.body);
    const cdet = await CardDetSchema.create(req.body);
    res.status(200).json(cdet);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getAuction = async(req, res) => {
  try {
    const Auctions = await AuctionSchema.find();
    res.status(200).json(Auctions);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const UpdtAuction = async(req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const auctupdt = await AuctionSchema.findByIdAndUpdate(id, {
      $set: newData,
    }, { new: true });
    res.status(200).json(auctupdt);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const getCardDet = async(req, res) => {
  const { id } = req.params;

  try {
    const Carddet = await AuctionSchema.findById(id);
    res.status(200).json(Carddet);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const upd_amt = async(req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const chng_price = await AuctionSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
    res.status(200).json(chng_price);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

const get_price = async(req, res) => {
  const { id } = req.params;

  try {
    const pr = await AuctionSchema.findById(id);
    res.status(200).json(pr);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

router.get('/getauc', getAuction);
router.put('/updt/:id', UpdtAuction);
router.get('/get_det/:id', getCardDet);
router.get('/get_amt/:id', get_price);
router.put('/upd-amt/:id', upd_amt);
router.post('/create-cart', crt_det);
router.use(cors({
    origin: ["*"] // List of allowed origins
  }));

module.exports = router;

