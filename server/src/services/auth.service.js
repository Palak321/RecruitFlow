import prisma from "../lib/prisma.js";
import { hashPassword } from "../utils/hash.js";

export async function registerUser(userData) {
  const { name, email, password, role } = userData;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return user;
}