import { uploadResume } from "../services/resume.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export async function uploadResumeController(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json(
        new ApiResponse(400, "Please upload a PDF resume.")
      );
    }

    const user = await uploadResume(req.user.id, req.file);

    return res.status(200).json(
      new ApiResponse(200, "Resume uploaded successfully", {
        resumeUrl: user.resumeUrl,
      })
    );
  } catch (error) {
    next(error);
  }
}