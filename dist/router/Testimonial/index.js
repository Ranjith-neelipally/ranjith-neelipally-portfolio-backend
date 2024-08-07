"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Testimonial_1 = require("../../controller/Testimonial");
const MiddleWare_1 = require("../../MiddleWare");
const Schema_1 = require("../../utils/Schema");
const TestimonialsRouter = (0, express_1.Router)();
TestimonialsRouter.post("/", (req, res) => {
    res.send("Testimonial Home");
});
TestimonialsRouter.post("/add-new", (0, MiddleWare_1.Validtor)(Schema_1.TestimonialValidationSchema), Testimonial_1.AddNewTestimonial);
TestimonialsRouter.delete("/delete", MiddleWare_1.verifyLoginToken, Testimonial_1.DeleteTestimonial);
TestimonialsRouter.post("/update", Testimonial_1.UpdateTestimonial);
TestimonialsRouter.patch("/verify-and-update", Testimonial_1.VerifyOTP);
exports.default = TestimonialsRouter;
