import mongoose, { Schema, Document } from "mongoose";

export interface IProject {
  no: string;
  name: string;
  tagline: string;
  blurb: string;
  role: string;
  status: string;
  stack: string[];
  year: string;
  href?: string;
}

export interface IExperience {
  years: string;
  role: string;
  org: string;
  note: string;
}

export interface IPortfolio extends Document {
  projects: IProject[];
  experience: IExperience[];
  tools: string[];
  now: string[];
}

const ProjectSchema = new Schema<IProject>({
  no: { type: String, required: true },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  blurb: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
  stack: [{ type: String, required: true }],
  year: { type: String, required: true },
  href: { type: String },
});

const ExperienceSchema = new Schema<IExperience>({
  years: { type: String, required: true },
  role: { type: String, required: true },
  org: { type: String, required: true },
  note: { type: String, required: true },
});

const PortfolioSchema = new Schema<IPortfolio>({
  projects: [ProjectSchema],
  experience: [ExperienceSchema],
  tools: [{ type: String, required: true }],
  now: [{ type: String, required: true }],
});

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
