import * as cardRepository from '../repositories/cardRepository.js'
import * as companyRepository from '../repositories/companyRepository.js'
import * as employeeRepository from '../repositories/employeeRepository.js'
import * as paymentRepository from '../repositories/paymentRepository.js'
import * as rechargeRepository from '../repositories/rechargeRepository.js'

import { TransactionTypes } from './../repositories/cardRepository'

import {
	createCreditCardInfo,
	isExpiredCard,
	makeCardBalance,
	makeCardName,
	makeExpirationDate
} from '../helpers/cardHelper.js'
import { encryptValue, isValidEncrypt } from './bcrypt.js'

import AuthCompanyError from '../errors/AuthCompanyError.js'
import ExistentCardError from '../errors/ExistentCardError.js'
import ExpiredCardError from '../errors/ExpiredCardError.js'
import NoFoundCardError from '../errors/NoFoundCardError.js'
import NoFoundEmployeeError from '../errors/NoFoundEmployeeError.js'
import cardAlreadyActiveError from '../errors/CardAlreadyActiveError.js'
import InvalidCvvError from '../errors/InvalidCvvError.js'


const createCard = async ({ employeeId, cardType, apiKey }) => {
	await validateApiKey(apiKey)
	const employee = await validateEmployee(employeeId)
	const { fullName } = employee
	await validateAddCardType(cardType, employeeId)

	const { cardNumber, cvv } = createCreditCardInfo()  // TODO: Deixar mais único?
	const cardholderName = makeCardName(fullName)
	const expirationDate = makeExpirationDate()

	const hashCvv = encryptValue(cvv)

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


const activateCard = async ({ securityCode, password, cardId }) => {
	const card = await validateCardId(cardId)
	validateExpiredCard(card.expirationDate)
	validateFirstRegister(card.password)
	validateCvv(securityCode, card.securityCode)

	const hashPassword = encryptValue(password)

	await cardRepository.update(cardId, {
		...card,
		password: hashPassword,
	})

	return {
		cardId,
	}
}


const getCardExtract = async ({ cardId }) => {
	await validateCardId(cardId)

	const transactions = await paymentRepository.findByCardId(cardId)
	const recharges = await rechargeRepository.findByCardId(cardId)

	const balance = makeCardBalance(transactions, recharges)

	return {
		balance,
		transactions,
		recharges,
	}
}


const rechargeCard = async ({ cardId, amount, apiKey }) => {
	await validateApiKey(apiKey)
	const card = await validateCardId(cardId)
	validateExpiredCard(card.expirationDate)

	await rechargeRepository.insert({ cardId, amount })
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

const validateCardId = async (cardId: number) => {
	const card = await cardRepository.findById(cardId)

	if (!card) throw new NoFoundCardError(cardId)

	return card
}

const validateExpiredCard = (expirationDate: string) => {
	if (isExpiredCard(expirationDate)) throw new ExpiredCardError(expirationDate)
}

const validateFirstRegister = (cardPassword: string | null) => {
	if (cardPassword !== null) throw new cardAlreadyActiveError('')
}

const validateCvv = (cvv: string, hashCvv: string) => {
	if (!isValidEncrypt(cvv, hashCvv)) throw new InvalidCvvError('')
}


export {
	createCard,
	activateCard,
	getCardExtract,
	rechargeCard,
}
