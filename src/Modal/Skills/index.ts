import { Model, model, Schema } from "mongoose";
import { SkillsInterface } from "../../@types/Skills";

const SkillsSchema = new Schema<SkillsInterface>({
  frameWorks: {
    type: [String],
    required: false,
  },
  skills: {
    type: [String],
    required: false,
  },
  tools: {
    type: [String],
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
});

export default model("Skills", SkillsSchema) as Model<SkillsInterface>;
