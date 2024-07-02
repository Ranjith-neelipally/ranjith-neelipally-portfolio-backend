import { RequestHandler } from "express";
import { LoginHandler } from "../../../@types/Login";
import Admin from "../../../Modal/Admin";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../../utils/variables";

export const HandleLogin: RequestHandler = async (req: LoginHandler, res) => {
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
        const jwdToken = jwt.sign({ userId: user._id }, TOKEN_KEY);

        user.tokens=jwdToken;
        await user.save();
        res.json({
          profile: {
            id: user._id,
            name: user.userName,
            verified: user.verified,
            projects: user.ProjectIds,
          },
          token: jwdToken,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
