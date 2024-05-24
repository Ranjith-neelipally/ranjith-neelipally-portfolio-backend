import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 8080

app.get('/', (_req: Request, res: Response) => {
	return res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})