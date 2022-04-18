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

cardRouter.patch(
	'/:cardId/activate',
	schemaValidation(cardSchema.activateSchema),
	cardController.activate
)
cardRouter.patch(
	'/:cardId/recharge',
	schemaValidation(cardSchema.rechargeSchema),
	cardController.recharge
)


export default cardRouter
