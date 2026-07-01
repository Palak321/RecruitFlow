import {
  getRecruiterDashboard,
  getCandidateDashboard,
} from "../services/dashboard.service.js";

import ApiResponse from "../utils/ApiResponse.js";

export async function recruiterDashboard(req, res, next) {
  try {
    const dashboard = await getRecruiterDashboard(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Recruiter dashboard fetched successfully",
        dashboard
      )
    );
  } catch (error) {
    next(error);
  }
}

export async function candidateDashboard(req, res, next) {
  try {
    const dashboard = await getCandidateDashboard(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Candidate dashboard fetched successfully",
        dashboard
      )
    );
  } catch (error) {
    next(error);
  }
}