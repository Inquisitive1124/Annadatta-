exports.imageUpload = async (req, res) => {
    try {
        const { description, address } = req.body;

        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }

        const post = req.user.id;
        console.log("Extracted User ID:", post);

        // Check if files exist
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        let files = req.files.imageFile;
        if (!Array.isArray(files)) {
            files = [files]; // Convert single file to array for consistency
        }

        const supportedTypes = ["jpg", "jpeg", "png"];
        let uploadedImages = [];

        for (let file of files) {
            const fileType = file.name.split('.').pop().toLowerCase(); // Corrected file extension extraction
            console.log("File Type:", fileType);

            if (!supportedTypes.includes(fileType)) {
                return res.status(400).json({
                    success: false,
                    message: `File format not supported: ${file.name}`,
                });
            }

            console.log(`Uploading ${file.name} to Cloudinary...`);
            const response = await uploadFileToCloudinary(file, "Food_application");
            console.log("Cloudinary Response:", response);

            uploadedImages.push(response.secure_url);
        }

        const fileData = await File.create({
            post: new mongoose.Types.ObjectId(post),
            description,
            address,
            images: uploadedImages, // Save all uploaded images
        });

        console.log(fileData);
        res.json({
            success: true,
            imageUrls: uploadedImages,
            message: "Images Successfully Uploaded",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
