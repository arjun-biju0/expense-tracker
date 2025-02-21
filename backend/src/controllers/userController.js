// import { createUserService, getAllUsersService, getUserByIdService } from "../models/userModel"
const { createUserService, getAllUsersService, getUserByIdService }=require('../models/userModel')
const handleResponse=(res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data
    });
};

const createUser=async(req,res,next)=>{
    const {name,username,email,password}=req.body;
    try {
        const newUser=await createUserService(name,username,email,password);
        handleResponse(res,201,"User Created successfully",newUser)
    } catch (error) {
        next(error)
    }
}

const getAllUsers=async(req,res,next)=>{
    try {
        const users=await getAllUsersService();
        handleResponse(res,200,"User fetched successfully",users)
    } catch (error) {
        next(error)
    }
}

const getUserById=async(req,res,next)=>{
    const {id}=req.params;
    try {
        const user=await getUserByIdService(id);
        if(!user) return handleResponse(res,404,"User does not exist");
        handleResponse(res,201,"User fetched successfully",user)
    } catch (error) {
        next(error)
    }
}

module.exports={createUser,getAllUsers,getUserById}