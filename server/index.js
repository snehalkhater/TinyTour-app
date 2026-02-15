import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import User from './models/user.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Tiny Tours API',
  });
});

app.get('/health',(req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
  });
});

app.post('/signup',async(req, res) =>{
  const{name, email,mobile,city,country,password} = req.body;
  
  if(!name){
    return res.json({
      "success": false,
      "message": "Name is required",
      "data": null,
    });
  }

  if(!email){
    return res.json({
      "success": false,   
      "message": "Email is required",
      "data": null,
    });
  }

  if(!password){
    return res.json({
      "success": false,     
      "message": "Password is required",        
      "data": null,
    });
  }

  const existingUser = await User.findOne({email});
  if(existingUser){
    return res.json({   
      "success": false,
      "message": "User with this email already exists",
      "data": null,
    });
  }

  const newUser = new User({
    name,
    email,
    mobile,
    city,
    country,
    password,

  })
  try{
    const savedUser = await newUser.save();
    return res.json({
      "success": true,
      "message": "User registered successfully",
      "data": savedUser,
    });

  }
  catch(error){
    return res.json({
      "success": false,
      "message": `user registration failed: ${error.message}`,
      "data": null,
    });
  }
});

app.post('/login',async(req, res) => {});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();

});