const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userSignup=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
        {
            return res.status(400).json({message:"email and password cant be empty"})
        }
    let user=await User.findOne({email})

    if(user){
        return res.status(400).json({error:"email is already exist"})
    }
    const hashPwd=await bcrypt.hash(password,10)
    const newUser=await User.create({
        email,password:hashPwd
    })

    let token=jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
//  return res.status(200).json({token,user}) 
  return res.status(200).json({token,user:newUser})
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
        {
            return res.status(400).json({message:"email and password cant be empty"})
        }
        let user=await User.findOne({email})
        if(user && await bcrypt.compare(password,user.password)){
            let token=jwt.sign({email,userId:user._id},process.env.SECRET_KEY)
             return res.status(200).json({token,user,userId:user._id})
        }
        else{
            return res.status(400).json({error:"Invalid credientials"})
        }
    }

const getUser=async(req,res)=>{
    const user=await User.findById(req.params.id)
    res.json({email:user.email})
}

module.exports={userLogin,userSignup,getUser}