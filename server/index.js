import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import User from './models/user.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;



const gatekeeper = (req, res, next) => {
  console.log("checking access");
  const { name, issocietymember } = req.body;
  console.log(`Hello,${name}`)
  if (issocietymember) {

    next();
  }
  else {
    return res.json({
      message: "Access is needed",
    })
  }
};


const areyoudrunk = (req, res, next) => {
  const { areyoudrunk } = req.body;
  if (areyoudrunk) {
    return res.json({ message: "drunk peopel are not alloweded" });
  }
  else {
    next();
  }


}

const checkJWT =(req, res, next) => {
  const {authorization} = req.headers;
  const token = authorization && authorization.split(" ")[1];
  console.log("TOKEN:",token);
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  }
  catch(err){
    return res.json({
      success: false,
      message: "Invalid or missing token",
      data: null
    })
  }
}

const society = (req, res) => {
  console.log("inside society");
  const random = Math.round(Math.random() * 100);
  res.json({ message: "thank you for coming in society", random });
}

app.post('/society', gatekeeper, areyoudrunk, society)



app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Tiny Tours API',
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
  });
});

app.get("/api_v1",checkJWT, (req, res) => {
   return res.json ({message: "API V1 is working1"});

});

app.get("/api_v2", (req, res) => {
 return res.json ({message: "API V2 is working1"});

});

app.post('/signup', async (req, res) => {
  const { name, email, mobile, city, country, password } = req.body;

  if (!name) {
    return res.json({
      "success": false,
      "message": "Name is required",
      "data": null,
    });
  }

  if (!email) {
    return res.json({
      "success": false,
      "message": "Email is required",
      "data": null,
    });
  }

  if (!password) {
    return res.json({
      "success": false,
      "message": "Password is required",
      "data": null,
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({
      "success": false,
      "message": "User with this email already exists",
      "data": null,
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const encryptedpassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    name,
    email,
    mobile,
    city,
    country,
    password: encryptedpassword,

  })
  try {
    const savedUser = await newUser.save();
    return res.json({
      "success": true,
      "message": "User registered successfully",
      "data": savedUser,
    });

  }
  catch (error) {
    return res.json({
      "success": false,
      "message": `user registration failed: ${error.message}`,
      "data": null,
    });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.json({
      "success": false,
      "message": "Email is required",
      "data": null,
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: "Password is required",
      data: null,
    });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.json({
      "success": false,
      "message": "User with this email does not exist",
      "data": null,
    });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingUser.password
  );

  existingUser.password = undefined;

  if (isPasswordCorrect) {

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      success: true,
      message: "Login successful",
      data: existingUser,
      jwtToken: jwtToken
    });
  } else {
    return res.json({
      "success": false,
      "message": "Invalid email or password",
      "data": null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();

});