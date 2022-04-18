import { Request, Response, NextFunction } from 'express'

import { validationErrors } from '../validations/handleValidation.js'
import { sanitizeInput } from '../helpers/validationHelper.js'

import { SchemaError } from '../errors/index.js'


function schemaValidation(schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const body = sanitizeInput(req.body)

		const errors = validationErrors({
			objectToValid: body,
			objectValidation: schema
		})

		if (errors) throw new SchemaError(errors)

		next()
	}
}


export {
	schemaValidation,
}
