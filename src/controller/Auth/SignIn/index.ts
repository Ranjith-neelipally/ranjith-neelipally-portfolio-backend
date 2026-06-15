import { RequestHandler, Response } from "express";
import { LoginHandler } from "../../../@types/Login";
import Admin from "../../../Modal/Admin";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../../utils/variables";
import { sendVerificationMail } from "../../../utils/Email";
import emailVerificationToken from "../../../Modal/VerificationCode";
import { generateRandomNumber } from "../../../utils/helpers";

export const HandleLogin: RequestHandler = async (
  req: LoginHandler,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      res.status(403).json({ error: "User Nnot found" });
    } else {
      const matched = await user.comparePassword(password);
      if (!matched) {
        res.status(403).json({ error: "Password mismatch" });
      } else {
        const token = jwt.sign({ userId: user._id }, TOKEN_KEY);
        if (!user.tokens) {
          user.tokens = [];
        }
        user.tokens.push(token);
        await user.save();

        res.json({
          message: "Logged in successfully",
          token: token,
          authToken: token,
          user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            slug: user.slug,
          }
        });
      }
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
  }
};
