 import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).send("Access Denied");
     
    jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
       
        if(req.userId!==user._id.toString())
        {
            return res.send("You can delete only your account");
        }
        await User.findByIdAndDelete(req.params.id);
        res.send("Your account has been deleted")
    })
}

export const getUser = async (req, res) => {
    const user = await User.find({"_id":`${req.params.id}`})
    if(!user) return res.status(404).send("User not found");
    console.log(user)
   // console.log(user);
    res.status(200).send(user);
}