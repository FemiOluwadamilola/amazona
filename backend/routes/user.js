import express from 'express';
import User from '../models/userSchema';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../config/utils';

const router = express.Router();

router.get('/createadmin', expressAsyncHandler(async (req,res) => {
    try{
      const user = new User({
         name:'Femi Oluwadamilola',
         email:'me@email.com',
         password:'password',
         isAdmin:true
      });
  
      const createdUser = await user.save();
      res.send(createdUser);
  
    }catch(err){
     res.status(500).send({msg:err.message})
    }
  }));

router.post('/register', expressAsyncHandler(async (req,res) => {
  try{
    const {name,email,password} = req.body;
    User.findOne({email})
    .then(user => {
      if(user){
        res.status(401).send({msg:'Email is already in Use.'})
      }else{
        const newUser = new User({
          name,
          email,
          password
        });
        newUser.save()
        .then(user => {
          const {_id,name,email,password} = user;
          res.send({
            _id,
            name,
            email,
            password,
            token:generateToken(user)
          })
        })
      }
    })
  }catch(err){
    res.status(500).send({msg:err.message});
  }
}))

router.put('/:id', expressAsyncHandler(async (req,res) => {
  try{
    const {name,email,password} = req.body;
    User.findById(req.params.id).then(user => {
       if(!user) {
         res.status(404).send({
           msg:'User Not Found!!!'
         })
       }else{
        const updatedUser = new User({
          name,
          email,
          password
        });
       updatedUser.save()
        .then(user => {
          const {_id,name,email,password} = user;
          res.send({
            _id,
            name,
            email,
            password,
            token:generateToken(user)
          })
        })
       }
    })
  }catch(err){
    res.status(500).send({msg:err.message});
  }
}))

router.post('/signin',expressAsyncHandler(async(req,res) => {
    const {email, password} = req.body;
    
    User.findOne({email,password})
    .then( user => {
        if(!user){
           res.status(401).send({msg:'Invalid Email or Password!'})
        }else{
          const {_id,name,email,password,isAdmin} = user;
          res.send({
            _id,
            name,
            email,
            password,
            token:generateToken(user)
          })
        }
    })

  }))
export default router;