const mongoose = require("mongoose");
const Post = require("../models/postModel");

const deletePost = async (req, res) => {
    try {
        console.log("Request User:", req.user);

        const userId = req.user.id; // Extract user ID from token (middleware)
        const postId = req.params.id; // Extract Post ID from request URL

        console.log("User ID:", userId);
        console.log("Post ID:", postId);

        if (!postId) {
            return res.status(400).json({ success: false, message: "Post ID is required" });
        }

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID missing in request" });
        }

        // Find the post by ID and check if it belongs to the logged-in user
        const post = await Post.findOne({ _id: postId, post: userId });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found or unauthorized",
            });
        }

        // Delete the post
        await Post.findByIdAndDelete(postId);

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
