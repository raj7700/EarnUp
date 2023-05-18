import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import twilio from "twilio";


const generateOtp = (user) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    user.otpExpiry = Date.now() + 1000 * 60 * 5;
    user.save();
    return otp;
}
const sendOtp = (otp, phone) => {
    try{
    console.log("sendOtp CALLED")
     const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
     const authToken = process.env.AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    client.messages
      .create({
        body: `Your OTP is ${otp}`,
        from: `+16205221663`,
        to: `+91${phone}`,
      })
      .then((message) => console.log(message.sid));
    }
    catch(err)
    {
        console.log(err);
    }
}

export const register = async (req, res,next) => {
    console.log("register CALLED")
    console.log(req.body);
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
        ...req.body,
        password: hashedPassword,
        });
        await newUser.save();
        console.log("hello");
        console.log(newUser);
        res.status(201).send("User created")
    }
    catch(err){
        console.log(err);
        next(err);
    }
}
export const login = async (req, res,next) => {
   try{
    const user = await User.findOne({username:req.body.username});
    if(!user)
    return next(createError(404,"User not found"));
     
    const isCorrectPassword =  bcrypt.compareSync(req.body.password, user.password);
    if(!isCorrectPassword)
     return next(createError(404, "Wrong password or username"));
    const token = jwt.sign({id:user._id, isSeller:user.isSeller}, process.env.JWT_KEY);
  const { password, ...info } = user._doc;
  res
    .cookie("accessToken", token, {
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
      httpOnly: true,
      SameSite: "none",
      Secure: false,
    })
    .status(200)
    .send(info);
    }
    catch(err){
        next(err);
    }
}
export const logout = async (req, res) => {
    res.clearCookie("accessToken",{
        SameSite:"none",
        secure:true,
    }).status(200).send("User has been logged out");
}

export const otpSend = async (req, res,next) => {
    try{
       // console.log("otpSend")
  const {phone} = req.body;
    //console.log(phone)
     const user = await User.findOne({phone:phone});
     console.log(user)
    if(!user)
    {
    return res.status(404).send("User not found");
    
    }

     const otptosend = generateOtp(user);
     console.log(otptosend,phone);
     sendOtp(otptosend, phone);
      res.status(200).send("OTP sent");
    }
    catch(err){
        next(err);
    }
}
    
export const otpVerify = async (req, res,next) => {
 
    console.log("otpVerify")
   try {
     const { phone,otp} = req.body;
     const user = await User.findOne({ phone: phone });
     if (!user) return next(createError(404, "User not found"));

     const isCorrectOtp = user.otp === otp;
     const isvalidOtp = user.otpExpiry > Date.now();
     if (!isCorrectOtp && !isvalidOtp)
       return next(createError(404, "OTP Expired of Wrong OTP"));
     user.otp = null;
      const token = jwt.sign(
        { id: user._id, isSeller: user.isSeller },
        process.env.JWT_KEY
      );
     const { password, ...info } = user._doc;
     res
       .cookie("accessToken", token, {
         expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
         httpOnly: true,
         SameSite: "none",
         Secure: false,
       })
       .status(200)
       .send(info);
   } catch (err) {
     next(err);
   }

}



