import joi from 'joi'


const cardSchema = joi.object({
	employeeId: joi.number().integer().min(1).required(),
	cardType: joi.any().valid(
		'groceries', 'restaurants', 'transport', 'education', 'health'
	).required(),
}).length(2)

const activateSchema = joi.object({
	securityCode: joi.string().regex(/^[0-9]{3}$/).required(),
	password: joi.string().regex(/^[0-9]{4}$/).required(),
}).length(2)

const rechargeSchema = joi.object({
	amount: joi.number().integer().min(1).required(),
}).length(1)


export {
	cardSchema,
	activateSchema,
	rechargeSchema,
}
