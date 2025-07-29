import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// 🌩️ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an array of File objects to Cloudinary
 * @param {File[]} files - Array of image files from FormData
 * @returns {Promise<string[]>} - Array of uploaded Cloudinary image URLs
 */
export async function uploadImagesToCloudinary(files) {
  const uploadedUrls = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stream = Readable.from(buffer);

    const uploaded = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "thread-haus", // Change or remove this if needed
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.pipe(uploadStream);
    });

    uploadedUrls.push(uploaded.secure_url);
  }

  return uploadedUrls;
}
