import { RequestHandler } from 'express';

export const HandleAdminForm: RequestHandler = (req, res) => {
  const { name, email } = req.body;

  if (name && email) {
    res.json({ message: "working in postman" });
  } else {
    res.status(400).json({ message: "not working" });
  }
};
