// const mongoose = require("mongoose");

 const Post = require("../models/postModel.js");
// const User = require("../models/userModel.js");

// const getUserPosts = async(req , res)=>{
//     try {
//         const userPosts = await Post.find({post : req.post._id})

//         res.status(200).json({
//             success:true,
//             data : userPosts,
//             message : "All User Posts fetched successfully"
//         })
//     } catch (error) {
        
//         res.status(500).json({
//             success:false,
//             message:"Error fetching User Posts",
//         })
//     }
// }


const getUserPosts = async (req, res) => {
    try {
        const userId = req.user.id; 
        console.log("User ID:", userId); 

        const userPosts = await Post.find({ post: userId }); 

        res.status(200).json({
            success: true,
            data: userPosts,
            message: "All User Posts fetched successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching User Posts",
        });
    }
};

module.exports = { getUserPosts };
