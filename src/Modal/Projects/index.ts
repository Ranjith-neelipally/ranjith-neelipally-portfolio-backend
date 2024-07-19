import { Model, Schema, model } from "mongoose";
import { ProjectInterface } from "src/@types/Projects";

const ProjectSchema = new Schema<ProjectInterface>({
  projectName: {
    type: String,
    required: false,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  projectPreview: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
    required: false,
  },
});

export default model("Project", ProjectSchema) as Model<ProjectInterface>;
