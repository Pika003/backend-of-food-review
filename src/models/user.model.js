import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema =  new mongoose.Schema({

    Email:{
        type:String,
        required:true,
    },
    
    Password:{
        type:String,
        required: true,
    },

    user_name:{
        type:String,
    },

    profile_img_url:{
        type:String,
    },

    first_name:{
        type:String,
    },

    last_name:{
        type:String,
    },

    address:{
        type:String,
    },

    phone_no:{
        type:String,
    },

    social_media: [{
        type: String
    }],

    Refreshtoken:{
        type:String,
    },

    forgetPasswordToken: String,

    forgetPasswordExpiry: Date,

}, {timestamps:true}) 

// userSchema.pre("save", async function(next) {
//     if(this.isModified('Firstname') || this.isNew){
//         this.Firstname = this.Firstname.charAt(0).toUpperCase() + this.Firstname.slice(1).toLowerCase();
//     }

//     if(this.isModified('Lastname') || this.isNew){
//         this.Lastname = this.Lastname.charAt(0).toUpperCase() + this.Lastname.slice(1).toLowerCase();
//     }

//     next()
// })

userSchema.pre("save", async function (next) {
    if(!this.isModified("Password")) return next(); 
      this.Password = await bcrypt.hash(this.Password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.Password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        Email:this.Email,
    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        Email:this.Email,
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

userSchema.methods.generateResetToken =async function(){
    const reset = crypto.randomBytes(20).toString('hex') ;
    this.forgetPasswordToken = crypto.createHash('sha256').update(reset).digest('hex') ;
    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000 ; 
    await this.save() ;
}

const user = mongoose.model("user",userSchema);

export {user}