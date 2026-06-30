import prisma from "../lib/prisma.js";

export async function createJob(data, recruiterId) {
  return prisma.job.create({
    data: {
      ...data,
      recruiterId,
    },
  });
}

export async function getAllJobs(search, page, limit) {
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            company: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        recruiter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),

    prisma.job.count({ where }),
  ]);

  return {
    jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getJobById(id) {
  return prisma.job.findUnique({
    where: { id },
    include: {
      recruiter: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function updateJob(id, recruiterId, data) {
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.recruiterId !== recruiterId) {
    throw new Error("You can update only your own jobs.");
  }

  return prisma.job.update({
    where: { id },
    data,
  });
}

export async function deleteJob(id, recruiterId) {
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.recruiterId !== recruiterId) {
    throw new Error("You can delete only your own jobs.");
  }

  return prisma.job.delete({
    where: { id },
  });
}