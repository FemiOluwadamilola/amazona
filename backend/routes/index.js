import express from 'express';
import data from '../models/data';

const router = express.Router();

router.get('/products', (req,res) => {
  res.send(data.products);
})

router.get('/products/:id', (req,res) => {
    const product = data.products.find((prt) => prt._id === req.params.id );
    if(product){
       res.send(product);
    }else{
      res.status(404).send({msg:'Oops Product Not Found!!!'});
    }
})
export default router;
