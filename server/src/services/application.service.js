import prisma from "../lib/prisma.js";
import ApiError from "../utils/ApiError.js";

export async function applyToJob(candidateId, jobId) {
  // Check if job exists
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // Prevent duplicate application
  const existingApplication = await prisma.application.findUnique({
    where: {
      candidateId_jobId: {
        candidateId,
        jobId,
      },
    },
  });

  if (existingApplication) {
    throw new ApiError(409, "You have already applied to this job.");
  }

  return prisma.application.create({
    data: {
      candidateId,
      jobId,
    },
    include: {
      job: true,
    },
  });
}

export async function getMyApplications(candidateId) {
  return prisma.application.findMany({
    where: {
      candidateId,
    },
    include: {
      job: {
        include: {
          recruiter: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getApplicants(jobId, recruiterId) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.recruiterId !== recruiterId) {
    throw new ApiError(403, "You can view applicants only for your own jobs.");
  }

  return prisma.application.findMany({
    where: {
      jobId,
    },
    include: {
      candidate: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateApplicationStatus(
  applicationId,
  recruiterId,
  status
) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      job: true,
    },
  });

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  if (application.job.recruiterId !== recruiterId) {
    throw new ApiError(
      403,
      "You can update only your own job applications."
    );
  }

  return prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      status,
    },
  });
}