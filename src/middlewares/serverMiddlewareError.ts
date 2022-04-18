import { Request, Response } from 'express'


const serverMiddlewareError = (err, req: Request, res: Response) => {
	console.log(`Middleware de erro:\n  ${err}`)
	
	return res.sendStatus(500)
}


export default serverMiddlewareError
