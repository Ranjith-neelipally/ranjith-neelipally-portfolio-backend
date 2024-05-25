import express, { Request, Response } from 'express'
import "./database"
import mongoose from "mongoose";
import { HandleAdminForm } from './controller/AdminForm';
import { Validtor } from './MiddleWare/validator';
import { ValidationSchema } from './utils/validationSchema';


const app = express()
const port = process.env.PORT || 8083
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
	return res.json({ message: 'Hello World!' })
})

app.post('/check', (req:Request, res:Response )=>{
	if(mongoose.connection.readyState===1){
		res.json({message:"connected"})
	}else{
		res.json({message:"not connected"})
	}
})

app.post('/adminForm',Validtor(ValidationSchema), HandleAdminForm)

app.listen(port, () => {
	return console.log(`Server is listening on http://localhost:${port}/adminForm`)
})