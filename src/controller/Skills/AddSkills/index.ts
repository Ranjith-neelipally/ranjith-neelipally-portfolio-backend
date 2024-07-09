import { RequestHandler } from "express";
import { SkillsInterface } from "src/@types/Skills";
import Admin from "../../../Modal/Admin";
import Skills from "../../../Modal/Skills";

export const AddSkills: RequestHandler = async (req: SkillsInterface, res) => {
  const { frameWorks, skills, tools, email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingSkills = (await user.skills.length) > 0;
    if (existingSkills) {
      return res
        .status(400)
        .json({ message: "Skills already added please edit existing skills" });
    }
      
    const skill = await Skills.create({ frameWorks, skills, tools, email });
    if (!skill) {
      return res.status(400).json({ message: "Skills not added" });
    }

    user.skills.push(skill._id);
    await user.save();

    return res.status(200).json({ message: "Skills added successfully", user });
  } catch (error) {
    console.error("Error adding skills:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
