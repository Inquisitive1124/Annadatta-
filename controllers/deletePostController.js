const mongoose = require("mongoose");
const Post = require("../models/postModel");

const deletePost = async (req, res) => {
    try {
        console.log("Request User:", req.user); 

        const userId = req.user.id;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID missing in request" });
        }

        const post = await Post.findOne({ post: userId });
        console.log(post);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        await Post.deleteOne({ post: userId });

        res.status(200).json({
            success: true,
            message: "Your post deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting your post",
        });
    }
};

module.exports = { deletePost };
