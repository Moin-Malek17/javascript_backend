import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from "fs"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDE_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET 
    });
    
    const uploadOnCloudinary = async (filePathLink /* file link local*/) => {
        try {
            if(!filePathLink)return null;
            const response=await cloudinary.uploader.upload(filePathLink,{
                resource_type : 'auto'
            })
            console.log("File is upload succefully",response.url);
            return response
        } catch (error) {
            fs.unlinkSync(filePathLink)
            return null
        }
    }

    export {uploadOnCloudinary}