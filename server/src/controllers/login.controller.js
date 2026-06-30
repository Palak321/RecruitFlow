import { loginSchema } from "../validators/login.validator.js";
import { loginUser } from "../services/login.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export async function login(req, res, next) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(
      data.email,
      data.password
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        result
      )
    );
  } catch (error) {
    next(error);
  }
}