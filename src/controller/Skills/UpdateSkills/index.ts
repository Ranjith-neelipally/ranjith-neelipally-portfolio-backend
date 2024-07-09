import { RequestHandler } from "express";
import { SkillsInterface } from "src/@types/Skills";
import Skills from "../../../Modal/Skills";
import Admin from "../../../Modal/Admin";

export const UpdateSkills: RequestHandler = async (
  req: SkillsInterface,
  res
) => {
  const { userId, skills } = req.body;
  try {
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const skillObject = await Skills.find({ _id: { $in: admin.skills } });
    if (!skillObject) {
      return res.status(404).json({ message: "Skills not found" });
    }

    const updatedSkills = await Skills.updateMany(
      { _id: { $in: admin.skills } },
      { $set: skills }
    );

    if (updatedSkills.modifiedCount === 0) {
      return res.status(404).json({ message: "Skills not updated" });
    }

    const count = updatedSkills.modifiedCount;

    res.status(200).json({ message: `${count} Skills updated successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
