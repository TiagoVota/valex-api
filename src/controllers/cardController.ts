import { NextFunction, Request, Response } from 'express'

import * as cardService from '../services/cardService.js'


const create = async (req: Request, res: Response, next: NextFunction) => {
	const { body: { employeeId, cardType } } = req
	const apiKey = req.headers['x-api-key']
	
	try {
		const card = await cardService.createCard({ employeeId, cardType, apiKey })
		
		return res.status(201).send(card)
		
	} catch (error) {
		next(error)
	}
}


export {
	create,
}
