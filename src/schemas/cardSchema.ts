import joi from 'joi'


const cardSchema = joi.object({
	employeeId: joi.number().integer().min(1).required(),
	cardType: joi.any().valid(
		'groceries', 'restaurants', 'transport', 'education', 'health'
	).required(),
}).length(2)


export {
	cardSchema,
}
