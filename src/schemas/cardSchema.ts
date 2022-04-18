import joi from 'joi'

import {
	cvvRegex,
	expirationDateRegex,
	passwordRegex
} from '../utils/regexPatterns.js'


const cardSchema = joi.object({
	employeeId: joi.number().integer().min(1).required(),
	cardType: joi.any().valid(
		'groceries', 'restaurants', 'transport', 'education', 'health'
	).required(),
}).length(2)


const activateSchema = joi.object({
	securityCode: joi.string().regex(cvvRegex).required(),
	password: joi.string().regex(passwordRegex).required(),
}).length(2)


const rechargeSchema = joi.object({
	amount: joi.number().integer().min(1).required(),
}).length(1)


const paymentSchema = joi.object({
	password: joi.string().regex(passwordRegex).required(),
	businessId: joi.number().integer().min(1).required(),
	amount: joi.number().integer().min(1).required(),
}).length(3)


const blockSchema = joi.object({
	password: joi.string().regex(passwordRegex).required(),
}).length(1)


const onlinePaymentSchema = joi.object({
	number: joi.string().length(19).required(),
	cardholderName: joi.string().required(),
	expirationDate: joi.string().regex(expirationDateRegex).required(),
	securityCode: joi.string().regex(cvvRegex).required(),
	businessId: joi.number().integer().min(1).required(),
	amount: joi.number().integer().min(1).required(),
}).length(6)


export {
	cardSchema,
	activateSchema,
	rechargeSchema,
	paymentSchema,
	blockSchema,
	onlinePaymentSchema,
}
