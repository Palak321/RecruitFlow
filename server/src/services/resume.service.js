import prisma from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export async function uploadResume(userId, file) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "RecruitFlow/resumes",
      },
      async (error, result) => {
        if (error) {
          return reject(error);
        }

        const user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            resumeUrl: result.secure_url,
          },
        });

        resolve(user);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
}