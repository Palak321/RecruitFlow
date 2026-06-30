import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../services/job.service.js";

import { createJobSchema } from "../validators/job.validator.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export async function createJobController(req, res, next) {
  try {
    const validatedData = createJobSchema.parse(req.body);

    const job = await createJob(validatedData, req.user.id);

    return res
      .status(201)
      .json(new ApiResponse(201, "Job created successfully", job));
  } catch (error) {
    next(error);
  }
}

export async function getAllJobsController(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    const jobs = await getAllJobs(search, page, limit);

    return res.status(200).json(
      new ApiResponse(200, "Jobs fetched successfully", jobs)
    );
  } catch (error) {
    next(error);
  }
}

export async function getJobByIdController(req, res, next) {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Job fetched successfully", job));
  } catch (error) {
    next(error);
  }
}

export async function updateJobController(req, res, next) {
  try {
    const job = await updateJob(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(200, "Job updated successfully", job)
    );
  } catch (error) {
    next(error);
  }
}

export async function deleteJobController(req, res, next) {
  try {
    await deleteJob(req.params.id, req.user.id);

    return res.status(200).json(
      new ApiResponse(200, "Job deleted successfully")
    );
  } catch (error) {
    next(error);
  }
}