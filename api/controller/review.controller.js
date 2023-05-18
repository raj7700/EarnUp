import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
    if(req.isSeller)
     return next(createError(403, "Seller cannot review a gig"));

     const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star
     })
    try{
        const review = await Review.findOne({userId: req.userId, gigId: req.body.gigId});

        if(review)
            return next(createError(403, "You already reviewed this gig"));
      
        const savedReview = await newReview.save(); 
        await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.star,starNumber:1}});
            res.status(201).send(savedReview);
    }
    catch(err){
        next(err);
    }
}

export const getReview = async (req, res, next) => {
    try{
        const reviews = await Review.find({gigId:req.params.gigId});
        res.status(200).send(reviews);
    }
    catch(err){
        next(err);
    }
}
export const deleteReview = async (req, res, next) => {

}