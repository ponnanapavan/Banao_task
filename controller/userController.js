import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateToken from "../tokengenrate.js";
async function signup(req,res)
{
    console.log(req.body);
    const {username,password,email}=req.body;
    try{
           const checkUser=await User.findOne({username});
           if(checkUser){
            return  res.status(400).json({error:'already user exists'});
           }

           if(!username || !password || !email){
                return  res.status(400).json({error:'all fields are required'});
           }
                const gensalt=await bcrypt.genSalt(10);
                const hashedpassword=await bcrypt.hash(password, gensalt);
               
                const newUser=new User({
                    username,
                    password:hashedpassword,
                    email
                })
                  if(newUser){
                    await newUser.save();
                    generateToken(newUser._id,res);

                  }
                         res.status(201).json(newUser)
               
                    
    }catch(err){
        res.status(500).json({error:'sever error'})
    }
}

async function login(req,res){
    const {username,password}=req.body;
    try{
           const user=await User.findOne({username});
           if(!user){
               return res.status(400).json({error:"login details are wrong"});
           }

           const checkPassword=await bcrypt.compare(password, user.password);
           if(!checkPassword){
            return res.status(400).json({error:"password is wrong"});
        }
             if(user && checkPassword){
                generateToken(user._id,res);
                res.status(200).json({message:'login sucessfull'});
             }

    }catch(err){
        res.status(500).json({error:err.message});
    }
}

async function upDatePassword(req,res){

    const userId=req.user._id;
    try{
     const {password}=req.body;
     const user=await User.findById(userId);
     if(!user){
        return res.status(400).json({error:"user not found"});
     }
         const salt=await bcrypt.genSalt(10);
         const hashedpassword=await bcrypt.hash(password,salt);
         console.log(user.password);
         user.password=hashedpassword||user.password;
         await user.save();
      
         res.status(201).json(user);

    }catch(err){
        res.status(500).json({error:err.message});
    }

}


export {signup, login, upDatePassword};