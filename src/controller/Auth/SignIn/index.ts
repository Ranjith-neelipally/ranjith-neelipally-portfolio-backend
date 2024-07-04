import { RequestHandler, Response } from "express";
import { LoginHandler } from "../../../@types/Login";
import Admin from "../../../Modal/Admin";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../../utils/variables";
import { sendVerificationMail } from "../../../utils/Email";
import emailVerificationToken from "../../../Modal/VerificationCode";
import { generateRandomNumber } from "../../../utils/helpers";


export const HandleLogin: RequestHandler = async (req: LoginHandler, res: Response) => {
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
        const verificationToken = generateRandomNumber(6);

        await emailVerificationToken.create({
          owner: user._id,
          token: verificationToken,
        });

        sendVerificationMail(verificationToken, {
          email: user.email,
          name: user.userName,
          userId: user._id.toString(),
        });
        await user.save();

        res.json({
          profile: {
            id: user._id,
            name: user.userName,
            verified: user.verified,
            projects: user.ProjectIds,
          },
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
