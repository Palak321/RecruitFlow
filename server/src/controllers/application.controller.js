import { applyJobSchema } from "../validators/application.validator.js";
import {
  applyToJob,
  getMyApplications,
} from "../services/application.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  getApplicants,
  updateApplicationStatus,
} from "../services/application.service.js";

import { updateStatusSchema } from "../validators/application.validator.js";

export async function applyToJobController(req, res, next) {
  try {
    const { jobId } = applyJobSchema.parse(req.body);

    const application = await applyToJob(req.user.id, jobId);

    return res.status(201).json(
      new ApiResponse(
        201,
        "Application submitted successfully",
        application
      )
    );
  } catch (error) {
    next(error);
  }
}

export async function getMyApplicationsController(req, res, next) {
  try {
    const applications = await getMyApplications(req.user.id);

    return res.status(200).json(
      new ApiResponse(
        200,
        "Applications fetched successfully",
        applications
      )
    );
  } catch (error) {
    next(error);
  }
}

export async function getApplicantsController(req, res, next) {
  try {
    const applicants = await getApplicants(
      req.params.jobId,
      req.user.id
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Applicants fetched successfully",
        applicants
      )
    );
  } catch (error) {
    next(error);
  }
}

export async function updateApplicationStatusController(
  req,
  res,
  next
) {
  try {
    const { status } = updateStatusSchema.parse(req.body);

    const application = await updateApplicationStatus(
      req.params.id,
      req.user.id,
      status
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Application status updated successfully",
        application
      )
    );
  } catch (error) {
    next(error);
  }
}