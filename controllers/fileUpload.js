const File = require("../models/postModel");
const cloudinary = require("cloudinary").v2

// exports.localFileUpload = async (req, res) => {
//     try {

//         const file = req.files.file; 
//         console.log("FILE AAGYI JEE -> ",file);


//         let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
//         console.log("PATH-> ", path)

        
//         file.mv(path , (err) => {
//             console.log(err);
//         });

//         res.json({
//             success:true,
//             message:'Local File Uploaded Successfully',
//         });

//     }
//     catch(error) {
//         console.log("Not able to upload the file on server")
//         console.log(error);
//     }
// }

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
    try{
        
        const {post, description, address} = req.body;
        console.log(post,description, address);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        console.log("Uploading to Cloudinary");
        const response = await uploadFileToCloudinary(file, "Food_application");
        console.log(response);

        const fileData = await File.create({
            post,
            description,
            address,
            image:response.secure_url,
        });

       return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        return res.status(400).json({
            success:false,
            message:'Something went wrong',
        });

    }
}
