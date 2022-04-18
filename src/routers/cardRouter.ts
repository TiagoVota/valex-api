import { Router } from 'express'

import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'

import * as cardController from '../controllers/cardController.js'

import * as cardSchema from '../schemas/cardSchema.js'


const cardRouter = Router()

cardRouter.get('/:cardId/extract', cardController.getExtract)

cardRouter.post(
	'',
	schemaValidation(cardSchema.cardSchema),
	cardController.create
)
cardRouter.post(
	'/:cardId/recharge',
	schemaValidation(cardSchema.rechargeSchema),
	cardController.recharge
)
cardRouter.post(
	'/:cardId/payment',
	schemaValidation(cardSchema.paymentSchema),
	cardController.payment
)

cardRouter.patch(
	'/:cardId/activate',
	schemaValidation(cardSchema.activateSchema),
	cardController.activate
)
cardRouter.patch(
	'/:cardId/block',
	schemaValidation(cardSchema.blockSchema),
	cardController.block
)
cardRouter.patch(
	'/:cardId/unblock',
	schemaValidation(cardSchema.blockSchema),
	cardController.unblock
)


export default cardRouter
