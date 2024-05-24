import express, { Request, Response } from 'express'
import "./database"
import mongoose from "mongoose";


const app = express()
const port = process.env.PORT || 8083

app.get('/', (_req: Request, res: Response) => {
	return res.json({ message: 'Hello World!' })
})

app.get('/check', (req:Request, res:Response )=>{
	if(mongoose.connection.readyState===1){
		res.json({message:"connected"})
	}else{
		res.json({message:"not connected"})
	}
})

app.listen(port, () => {
	return console.log(`Server is listening on http://localhost:${port}`)
})