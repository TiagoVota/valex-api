import bcrypt from 'bcrypt'

import * as cardRepository from '../repositories/cardRepository.js'
import * as companyRepository from '../repositories/companyRepository.js'
import * as employeeRepository from '../repositories/employeeRepository.js'

import { TransactionTypes } from './../repositories/cardRepository'

import {
	createCreditCardInfo,
	makeCardName,
	makeExpirationDate
} from '../helpers/cardHelper.js'

import AuthCompanyError from '../errors/AuthCompanyError.js'
import NoFoundEmployeeError from '../errors/NoFoundEmployeeError.js'
import ExistentCardError from '../errors/ExistentCardError.js'


const createCard = async ({ employeeId, cardType, apiKey }) => {
	const CVV_SALT = 12

	await validateApiKey(apiKey)
	const employee = await validateEmployee(employeeId)
	const { fullName } = employee
	await validateAddCardType(cardType, employeeId)

	const { cardNumber, cvv } = createCreditCardInfo()  // TODO: Deixar mais único?
	const cardholderName = makeCardName(fullName)
	const expirationDate = makeExpirationDate()

	const hashCvv = bcrypt.hashSync(cvv, CVV_SALT)

	await cardRepository.insert({
		employeeId,
		number: cardNumber,
		cardholderName,
		securityCode: hashCvv,
		expirationDate,
		password: null,
		isVirtual: false,
		originalCardId: null,
		isBlocked: false,
		type: cardType,
	})

	return {
		employeeId,
		number: cardNumber,
		cardholderName,
		securityCode: cvv,
		expirationDate,
		password: null,
		isVirtual: false,
		originalCardId: null,
		isBlocked: false,
		type: cardType,
	}
}


const validateApiKey = async (apiKey: string) => {
	const company = await companyRepository.findByApiKey(apiKey)

	if (!company) throw new AuthCompanyError('')

	return company
}

const validateEmployee = async (employeeId: number) => {
	const employee = await employeeRepository.findById(employeeId)

	if (!employee) throw new NoFoundEmployeeError(employeeId)

	return employee
}

const validateAddCardType = async (cardType: TransactionTypes, employeeId: number) => {
	const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId)

	if (card) throw new ExistentCardError(cardType)
}


export {
	createCard,
}

