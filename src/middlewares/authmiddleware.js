// const jwt = require('jsonwebtoken');

// // Middleware to authenticate JWT tokens
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers['authorization'];

//     if (!authHeader) {
//         return res.status(401).json({ message: 'Authorization header not found' });
//     }

//     const token = authHeader.split(' ')[1]; // Extract token from the "Bearer <token>" format

//     if (!token) {
//         return res.status(401).json({ message: 'Access token is missing' });
//     }

//     try {
       
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(`${JSON.stringify(decoded)}`);
//         req.user = decoded;
//         req.body = { ...req.body, newField: 'newValue' };

//         next(); 
//     } catch (error) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };

// module.exports = authMiddleware;


// const jwt = require('jsonwebtoken');
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const authMiddleware = async (req, res,next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Bearer header

//   if (!token) {
//     return res.status(401).json({ message: 'Token is missing' });
//   }

//   try {
//     let userData;

//     // Check if it's a Google token by trying to verify with Google
//     try {
//       const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENT_ID,
//       });
//       userData = ticket.getPayload(); // Google token is valid, extract user details
//       console.log(`in google token try block`);
      
//     } catch (error) {
//       // If verification with Google fails, fall back to custom JWT
//       userData = jwt.verify(token, process.env.JWT_SECRET); // Verify your own JWT
//       console.log(`in jjwt token catch block`);
//       console.log(`${JSON.stringify(userData)}`);
//       req.user = userData;
//     //   next();
//     }
//     next();
//     // If token is valid, return the profile data
//     // res.status(200).json({
//     //   message: 'Profile retrieved successfully',
//     //   user: userData, // This would either be from Google or your own JWT
//     // });
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid or expired token', error: error.message });
//   }
// };
// module.exports=authMiddleware;

const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const UserModel=require('../models/adminModel');
// Initialize Google OAuth2 client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header not found' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        
        if (isGoogleToken(token)) {
           console.log(`in google token block`);
            // const ticket = await googleClient.verifyIdToken({
            //     idToken: token,
            //     audience: process.env.GOOGLE_CLIENT_ID,
            // });
            // const payload= googleClient.getTokenInfo(token);

            //this call only give email and googleId, if you call this thhen yoou will get the email and after getting the email,, you must
            //have to call an internal api  const user= await userModel.getstudentbyID(payload.email) and then fetch every field from
            // user and save this inside the req.user{..id=user.id,...}
            
            // const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);
            // const payload = response.data;

         const userInfoResponse = await axios.get(`https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(`creating ticket`);
            //  const payload = ticket.getPayload();
            const userInfo=userInfoResponse.data;

            //  console.log(`HI:${payload}`);
            console.log(`get the  userInfo :${JSON.stringify(userInfo)}`);
           
            
            const user = await UserModel.getstudentbyemail( userInfo.emailAddresses[0].value );

            req.user = {
                id: user.id ||null,
                googleId: userInfo.resourceName.split('/')[1], // Google user ID=id:payload.sub
                //googleId: payload.sub,
                // email: payload.email,
                // name: payload.name,
                // profilePhoto: payload.picture,
                email: userInfo.emailAddresses[0].value,
                name: userInfo.names[0].displayName,
                profilePhoto: userInfo.photos[0].url
            };
            console.log(`${req.user.email}`);
           // console.log(`${payload.email}`);
        } else {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(`${JSON.stringify(decoded)}`);
            console.log(`in jwt else cndt`);
            req.user = decoded;
        }
        console.log('User Info:', req.user);
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token', error: error.message });
    }
};

// Function to check if the token is a Google OAuth token
const isGoogleToken = (token) => {
    // Google tokens usually start with "ya29." and have a different structure than JWTs
    return token.startsWith('ya29.');
};

module.exports = authMiddleware;
