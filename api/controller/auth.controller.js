import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";


export const register = async (req, res,next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
        ...req.body,
        password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send("User created")
    }
    catch(err){
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
