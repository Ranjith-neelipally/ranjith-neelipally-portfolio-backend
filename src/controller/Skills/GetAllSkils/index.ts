import { RequestHandler } from "express";
import { SkillsInterface } from "../../../@types/Skills";
import Admin from "../../../Modal/Admin";
import Skills from "../../../Modal/Skills";
export const GetAllSkills: RequestHandler = async (
  req: SkillsInterface,
  res
) => {
    const { email } = req.query;
    const user = await Admin.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const allSkills = await Skills.findOne({ _id: { $in: user.skills } });
    return res.status(200).json({ message: "User found", allSkills });
};
