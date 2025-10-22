// // import User from "../models/User.js";
// // import bcrypt from 'bcryptjs';

// // import jwt from 'jsonwebtoken';





// // //Register User :  /api/user/register

// // export const register = async  (req,res)=>{
// //     try {
// //         const{name,email,password}=req.body;

// //         if(!name || !email ||!password ){
// //             return  res.json({success:false,message:'missing Details'});
// //         }

// //         const existingUser=await User.findOne({email});
        
// //         if(existingUser)
// //              return res.json({success:false,message:'User already exist'});
        
// //         const hashedPassword =await bcrypt.hash(password,10);

// //         const user=await User.create({name,email,password:hashedPassword});
// //         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'} );
        
// //         res.cookie('token',token,{
// //             httpOnly:true,//prevent the javascript to access cookie
// //             secure:process.env.NODE_ENV==='production',//use secure Cookie in production
// //             sameSite:process.env.NODE_ENV ==='production'?'none':'strict',//CSRF Protection 
// //             maxAge:7*24*60*60*1000,//cookie expiration time
// //         })
// //         return res.json({success:true,user:{email:user.email,name:user.name}})
// //     } catch (error) {
// //         console.log(error.message );
        
// //              res.json({success:false,message:error.message});
// //     }

// // }

// import User from "../models/User.js";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// //Register User :  /api/user/register
// export const register = async (req,res)=>{
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({ success:false, message:'missing Details' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success:false, message:'User already exist' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn:'7d' });

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//       maxAge: 7*24*60*60*1000,
//     });

//     return res.json({ success:true, user:{ email: user.email, name: user.name } });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ success:false, message: error.message });
//   }
// }

// //login User :  /api/user/login

// export const login =async(req,res)=>{
//     try {
//         const{email,password}=req.body;
//         if(!email || !password)
//             return res.json({success:false,message:'Email and Password are Required'});

//         const user=await User.findOne({email});
//         if(!user){
//              return res.json({success:false,message:'Invalid email or password'});

//         }
//         const isMatch=await bcrypt.compare(password,user.password)
        
//         if(!isMatch)
//             return res.json({success:false,message:'Invalid email or password'});

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn:'7d' });

//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//       maxAge: 7*24*60*60*1000,
//     });

//     return res.json({ success:true, user:{ email: user.email, name: user.name } }); 
//     } catch (error) {
//         console.log(error.message);
//         return res.json({ success:false, message: error.message });
//     }   
// }

// //check AUTH: /api/user/is-auth

// export const isAuth =async (req,res)=>{
//   try {
//     const {userId}=req.body;
//     const user =await User.findById(userId).select("-password")
//     return res.json({success:true,user})
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success:false, message: error.message });
//   }
// }

// // //Logout User : /api/user/logout

// export const logout =async (req,res)=>{
//   try {
//     res.clearCookie('token',{
//       httpOnly:true,
//       secure:process.env.NODE_ENV==='production',
//       sameSite:process.env.NODE_ENV==='production'?'none':'strict',

//     });
//     return res.json({success:true,message:"Logged Out"})
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success:false, message: error.message });
//   }
// }



import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET?.trim();

const cookieOptionsDev = {
  httpOnly: true,
  secure: false,   // localhost over http
  sameSite: 'lax', // dev-friendly
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing details' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    res.cookie('token', token, cookieOptionsDev);

    return res.json({ success: true, user: { email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
    res.cookie('token', token, cookieOptionsDev);

    // For debugging, include token (remove in production)
    return res.json({ success: true, token, user: { email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuth = async (req, res) => {
  try {
    const userId = req.user?.id; // from authUser
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return res.json({ success: true, message: 'Logged Out' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};