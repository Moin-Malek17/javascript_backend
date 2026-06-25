import mongoose ,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema =new  Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        index:true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
    },
    fullname: {
        type : String,
        required : true,
        trim : true,
        index:true
    },
    avatar: {
        type : String, //cloudnary img id
        required : true,
    },
    coverImage: {
        type : String,
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "video"
        }
    ],
    password : {
        type : String,
        required : [true,"password is required"]
    },
    refreshToken : {
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password) 
}
userSchema.methods.genrateAccessToken = function (){
    return jwt.sign(
        {
            // payload
            _id : this._id,
            username : this.username,
            email : this.email,
            fullname : this.fullname
        },
        // secret key
        process.env.ACCESS_TOKEN_SECRET,
        {
            // expriy
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken = function (){
    return jwt.sign(
        {
            // payload
            _id : this._id,
        },
        // secret key
        process.env.REFRESH_TOKEN_SECRET,
        {
            // expriy
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
const User = mongoose.model("User",userSchema)