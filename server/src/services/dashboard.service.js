import prisma from "../lib/prisma.js";

export async function getRecruiterDashboard(recruiterId) {
  const [
    totalJobs,
    openJobs,
    closedJobs,
    totalApplications,
    recentApplications,
  ] = await Promise.all([
    prisma.job.count({
      where: {
        recruiterId,
      },
    }),

    prisma.job.count({
      where: {
        recruiterId,
        status: "OPEN",
      },
    }),

    prisma.job.count({
      where: {
        recruiterId,
        status: "CLOSED",
      },
    }),

    prisma.application.count({
      where: {
        job: {
          recruiterId,
        },
      },
    }),

    prisma.application.findMany({
      where: {
        job: {
          recruiterId,
        },
      },
      include: {
        candidate: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
            company: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  return {
    totalJobs,
    openJobs,
    closedJobs,
    totalApplications,
    recentApplications,
  };
}

export async function getCandidateDashboard(candidateId) {
  const [
    appliedJobs,
    pending,
    shortlisted,
    rejected,
    recentApplications,
  ] = await Promise.all([
    prisma.application.count({
      where: {
        candidateId,
      },
    }),

    prisma.application.count({
      where: {
        candidateId,
        status: "PENDING",
      },
    }),

    prisma.application.count({
      where: {
        candidateId,
        status: "SHORTLISTED",
      },
    }),

    prisma.application.count({
      where: {
        candidateId,
        status: "REJECTED",
      },
    }),

    prisma.application.findMany({
      where: {
        candidateId,
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            location: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  return {
    appliedJobs,
    pending,
    shortlisted,
    rejected,
    recentApplications,
  };
}