import prisma from "../lib/prisma.js";
import { comparePassword } from "../utils/hash.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/token.js";

export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return {
    token,
    user,
  };
}