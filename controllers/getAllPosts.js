const mongoose = require("mongoose");
const Post = require("../models/postModel");

const getAllPosts = async(req , res)=>{

    try {
        const allPosts = await Post.find();

        res.status(200).json({
            success:true,
            data : allPosts,
            message:"All posts fetched",

        })
    } catch (error) {
        res.staus(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

module.exports = { getAllPosts };