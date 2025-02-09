const File = require("../models/postModel");
const cloudinary = require("cloudinary").v2
const mongoose = require("mongoose")

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { description, address } = req.body;
        
        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }

        const post = req.user.id;
        console.log("Extracted User ID:", post);

        const file = req.files.imageFile;
        console.log("Uploaded File:", file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        console.log("Uploading to Cloudinary...");
        const response = await uploadFileToCloudinary(file, "Food_application");
        console.log("Cloudinary Response:", response);

        const fileData = await File.create({
            post: new mongoose.Types.ObjectId(post),
            description,
            address,
            image: response.secure_url,
        });
        console.log(fileData);
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
