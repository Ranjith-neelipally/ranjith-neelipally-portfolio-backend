import express, { Request, Response } from 'express'
import "./database"

const app = express()
const port = process.env.PORT || 8083

app.get('/', (_req: Request, res: Response) => {
	return res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
	return console.log(`Server is listening on http://localhost:${port}`)
})