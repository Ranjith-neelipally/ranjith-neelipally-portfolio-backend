import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { TOKEN_KEY } from "../../utils/variables";
import Admin from "../../Modal/Admin";

export const verifyLoginToken: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const splitToken = authorization?.split("Bearer ")[1]?.trim();

  if (!splitToken) {
    return res.status(403).json({ error: "Unauthorized Request!" });
  }

  try {
    const details = verify(splitToken, TOKEN_KEY) as JwtPayload;
    const id = details.userId;

    if (!id) {
      return res.status(403).json({ error: "UnauthorizUsered Request!" });
    }

    const user = await Admin.findOne({ _id: id, tokens: splitToken });

    if (!user) {
      return res.status(404).json({ response: "Unauthorized Request!" });
    }

    req.user = {
      id: user._id,
      name: user.userName,
      verified: user.verified as boolean,
      projects: user.ProjectIds.map((id) => id.toString()),
    };
    req.token = splitToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized Request!" });
  }
};
