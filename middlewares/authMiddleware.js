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
require("dotenv").config();
exports.auth = (req, res, next) => {
    try {
        // Extract JWT token from Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            });
        }

        // Verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload; // Attach the payload to req.user
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }
        next(); // Move to the next middleware/handler
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while verifying the token',
        });
    }
};
