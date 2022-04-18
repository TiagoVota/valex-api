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


const activate = async (req: Request, res: Response, next: NextFunction) => {
	const {
		body: { securityCode, password },
		params: { cardId }
	} = req
	
	try {
		await cardService.activateCard({
			securityCode,
			password,
			cardId,
		})
		
		return res.status(200).send(`Card id '${cardId}' updated!`)
		
	} catch (error) {
		next(error)
	}
}


const getExtract = async (req: Request, res: Response, next: NextFunction) => {
	const { params: { cardId } } = req
	
	try {
		const extract = await cardService.getCardExtract({ cardId })
		
		return res.status(200).send(extract)
		
	} catch (error) {
		next(error)
	}
}


export {
	create,
	activate,
	getExtract,
}
