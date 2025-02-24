// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.auth = (req,res, next) => {
//     try{
//         //extract JWT token
//         //PENDING : other ways to fetch token
//         const token = req.body.token ;

//         if(!token) {
//             return res.status(401).json({
//                 success:false,
//                 message:'Token Missing',
//             });
//         }

//         //verify the token
//         try{
//             const payload = jwt.verify(token, process.env.JWT_SECRET);
//             console.log(payload);
//             //why this ?
//             req.user = payload;
//         } catch(error) {
//             return res.status(401).json({
//                 success:false,
//                 message:'token is invalid',
//             });
//         }
//         next();
//     } 
//     catch(error) {
//         return res.status(401).json({
//             success:false,
//             message:'Something went wrong, while verifying the token',
//         });
//     }
   
// }

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token missing or invalid format",
            });
        }

        const token = authHeader.split(" ")[1]; 
        const payload = jwt.verify(token, process.env.JWT_SECRET); 

        console.log("Decoded Payload:", payload); 
        req.user = payload; 
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

