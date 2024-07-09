import { RequestHandler } from "express";
import * as yup from "yup";

export const Validtor = (schema: any): RequestHandler => {
  return async (req, res, next) => {
    if (!req.body) {
      return res.status(322).json({ error: "invalid body" });
    }
    const ValidationSchema = yup.object({
      body: schema,
    });

    try{
        await ValidationSchema.validate({body:req.body}, {abortEarly:true});
        next(); 
    }
    catch(error){
        if(error instanceof yup.ValidationError){
            res.json({error:error.message})
        }
    }
  };
};