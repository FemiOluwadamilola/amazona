import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import route from './routes/index';
import userRoute from './routes/user';
import config from './config/config';

const URL = config.MONGODB_URL;

mongoose.connect('mongodb://localhost:27017/amazona',
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
  })
.then(() => {
  console.log('mongodb connected...')
})
.catch((err) => console.log(err));

const server = express();

server.use(cors());

server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use('/api', route);
server.use('/api/user',userRoute);

// error validation middleware!!!
server.use((err,req,res,next) => {
  const status = err.name && err.name === 'validationError' ? 400 : 500;
  res.status(status).send({msg:err.message});
  next();
})

const PORT = process.env.PORT || 5000;
server.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})
