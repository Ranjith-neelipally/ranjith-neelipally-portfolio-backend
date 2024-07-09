import { Model, model, Schema } from "mongoose";
import { TestimonialsInterface } from "../../@types/Testimonials";

const TestimonialsSchems = new Schema<TestimonialsInterface>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
});

export default model(
  "Testimonials",
  TestimonialsSchems
) as Model<TestimonialsInterface>;
