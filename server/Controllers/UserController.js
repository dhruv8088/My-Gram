import UserModel from "../Models/userModal.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Get all users

export const getAllUsers = async (req, res) => {

    try {
      let users = await UserModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  };

// get a User
export const getUser = async (req,res) =>{
    const id = req.params.id;

    try {
        const user= await UserModel.findById(id);

        if(user){
             
            res.status(200).json(user)
        }
        else{
            res.status(404).json("No such user exists")
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

// For updating a user

export const updateUser = async(req,res) =>{
    const id= req.params.id;
    const {_id, currentUserAdminStatus, password} = req.body;
// only updating is possible if person is using their own account or admin can do so
    if(id===_id)
    {
        try {
     // for updating an password
            if(password){
                     const salt = await bcrypt.genSalt(10);
                     req.body.password = await bcrypt.hash(password, salt)
            }
   /// for updating other details
            const user= await UserModel.findByIdAndUpdate(id,req.body, {new:true} );
          const token = jwt.sign(
            {username: user.username, id: user._id},
            process.env.JWTKEY,
            {expiresIn: "1h"}
          )
            res.status(200).json({user,token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied! you can only update your own profile")
    }
}

// Deleting a user

export const deleteUser = async(req,res) =>{
    const id= req.params.id;

    const {_id, currentUserAdminStatus} = req.body


    if(id===_id || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied! you can only delete your own profile")
    }

}

// Follow a another user
export const followUser = async (req,res)=>{
    // user who is being followed
    const id= req.params.id;
  // user who is going to follow
    const {_id} = req.body;
    if(_id === id)
    {
        res.status(403).json("Action forbidden");
    }
    else{
        try {
            const followUser= await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);
   // if the user which we are going to follow is already followed by us then do nothing
            if(!followUser.followers.includes(_id))
            {
                await followUser.updateOne({$push : {followers : _id}});
                await followingUser.updateOne({$push: {following: id}});
                res.status(200).json("User followed!");
            }
            else{
                res.status(403).json("User is already followed by you");
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

// unfollowing a user

export const unFollowUser = async (req,res)=>{
    // user who is being followed
    const id= req.params.id;
  // user who is going to follow
    const {_id} = req.body;
    if(_id === id)
    {
        res.status(403).json("Action forbidden");
    }
    else{
        try {
            const followUser= await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);
   // if the user which we are going to unfollow is already followed by us then do unfollow
            if(followUser.followers.includes(_id))
            {
                await followUser.updateOne({$pull : {followers : _id}});
                await followingUser.updateOne({$pull: {following: id}});
                res.status(200).json("User unfollowed!");
            }
            else{
                res.status(403).json("User is not followed by you");
            }
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
}