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


const recharge = async (req: Request, res: Response, next: NextFunction) => {
	const {
		body: { amount },
		params: { cardId },
	} = req
	const apiKey = req.headers['x-api-key']
	
	try {
		await cardService.rechargeCard({ cardId, amount, apiKey })
		
		return res.status(200).send(`Recharged '${amount}' in card id '${cardId}'!`)
		
	} catch (error) {
		next(error)
	}
}


const payment = async (req: Request, res: Response, next: NextFunction) => {
	const {
		body: { password, businessId, amount },
		params: { cardId },
	} = req
	
	try {
		await cardService.paymentCard({ cardId, password, businessId, amount })
		
		return res.status(200).send(`Paid out '${amount}' from card id '${cardId}'!`)
		
	} catch (error) {
		next(error)
	}
}


const block = async (req: Request, res: Response, next: NextFunction) => {
	const {
		body: { password },
		params: { cardId },
	} = req
	
	try {
		await cardService.blockCard({ cardId, password })
		
		return res.status(200).send(`Card id '${cardId}' blocked!`)
		
	} catch (error) {
		next(error)
	}
}


const unblock = async (req: Request, res: Response, next: NextFunction) => {
	const {
		body: { password },
		params: { cardId },
	} = req
	
	try {
		await cardService.unblockCard({ cardId, password })
		
		return res.status(200).send(`Card id '${cardId}' unblocked!`)
		
	} catch (error) {
		next(error)
	}
}


export {
	create,
	activate,
	getExtract,
	recharge,
	payment,
	block,
	unblock,
}
