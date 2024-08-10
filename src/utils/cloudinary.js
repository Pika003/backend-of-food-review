import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
  cloud_name: 'dn1mkynfh',
  api_key: '538727962871351',
  api_secret: 'bObgWaSI7PGkjvvG1k2ydgC9HCk'
});


const uploadOnCloudinary = async (localFilePath) => {
    
    try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch(err){
        fs.unlinkSync(localFilePath)
        console.log("cloudinary upload error ", err)
        return null;
    }
}


export {uploadOnCloudinary}
