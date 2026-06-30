import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export function getCurrentUser(req, res) {
  return res.status(200).json(
    new ApiResponse(200, "Current user fetched successfully", {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    })
  );
}

export async function register(req, res) {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerUser(validatedData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}