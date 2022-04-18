import { NextFunction, Request, Response } from 'express'


const create = async (req: Request, res: Response, next: NextFunction) => {
	
	try {
		console.log('Hello World!')
		
	} catch (error) {
		next(error)
	}
}


export {
	create,
}
