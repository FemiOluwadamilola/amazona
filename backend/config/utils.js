import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const {_id,name,email,password,isAdmin} = user;
  return jwt.sign({
     _id,
     name,
     email,
     password,
     isAdmin
  },'IprayTheAppWorkWithNoBug');
}