import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath){
            //console.log("❌ No file path received for Cloudinary upload.");
            return null
        }
        
        //console.log("📁 Trying to upload file:", localFilePath);

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);

        //console.log("🧹 Deleting local file:", localFilePath);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        // console.log("🚨 Error uploading to Cloudinary or deleting file");
        // console.log("👉 localFilePath was:", localFilePath);
        // console.log("🧾 Error details:", error.message);
        // if (fs.existsSync(localFilePath)) {
        //     fs.unlinkSync(localFilePath); // cleanup
        // }
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}
    
    