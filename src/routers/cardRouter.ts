import { Router } from 'express'

import { schemaValidation } from '../middlewares/schemaValidationMiddleware.js'

import * as cardController from '../controllers/cardController.js'

import { activateSchema, cardSchema } from '../schemas/cardSchema.js'


const cardRouter = Router()

cardRouter.get('/:cardId/extract', cardController.getExtract)

cardRouter.post('', schemaValidation(cardSchema), cardController.create)

cardRouter.patch(
	'/:cardId/activate',
	schemaValidation(activateSchema),
	cardController.activate
)


export default cardRouter
