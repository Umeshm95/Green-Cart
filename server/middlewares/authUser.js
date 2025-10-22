// import jwt from 'jsonwebtoken';

// const authUser =async (req,res,next)=>{
//     const {token} =req.cookies;
//     if(!token){

//         return res.json({success:false,message:'Not Authorized'}); 
//     }
//     try {
//         const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
//         if(tokenDecode.id){
//             req.body.userId=tokenDecode.id;
//         }else{
//             return res.json({success:false,message:'Not Authorized'}); 
//         }
//         next();

//     } catch (error) {
//          res.json({success:false,message:'Not Authorized'}); 
//     }
// }

// export default authUser;

import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const cookieToken = req.cookies?.token;
    const header = req.headers.authorization;
    const bearerToken = header?.startsWith('Bearer ') ? header.split(' ')[1] : null;
    const token = cookieToken || bearerToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    const secret = process.env.JWT_SECRET?.trim();
    if (!secret) {
      console.error('JWT_SECRET is missing');
      return res.status(500).json({ success: false, message: 'Server misconfiguration' });
    }

    const payload = jwt.verify(token, secret); // throws if invalid/expired
    if (!payload?.id) {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    req.user = { id: payload.id }; // attach user id here
    return next();
  } catch (err) {
    console.error('JWT verify failed:', err.name, err.message);
    return res.status(401).json({
      success: false,
      message: err.name === 'TokenExpiredError' ? 'Token expired' : 'Not Authorized',
    });
  }
};

export default authUser;