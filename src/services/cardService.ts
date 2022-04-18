import * as businessRepository from '../repositories/businessRepository.js'
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
	makeExpirationDate,
	sanitizeCardMovement
} from '../helpers/cardHelper.js'
import { encryptValue, isValidEncrypt } from './bcrypt.js'

import AuthCompanyError from '../errors/AuthCompanyError.js'
import BlockCardError from '../errors/BlockCardError.js'
import CardAlreadyActiveError from '../errors/CardAlreadyActiveError.js'
import ExistentCardError from '../errors/ExistentCardError.js'
import ExpiredCardError from '../errors/ExpiredCardError.js'
import NoFoundIdError from '../errors/NoFoundIdError.js'
import NoMatchTypesError from '../errors/NoMatchTypesError.js'
import InsufficientBalanceError from '../errors/InsufficientBalanceError.js'
import InvalidEncryptError from '../errors/InvalidEncryptError.js'
import UnblockCardError from '../errors/UnblockCardError.js'


const createCard = async ({ employeeId, cardType, apiKey }) => {
	await validateApiKey(apiKey)
	const employee = await validateEmployee(employeeId)
	const { fullName } = employee
	await validateAddCardType(cardType, employeeId)

	const existentCardsNumber = await getCardNumbers()
	const { cardNumber, cvv } = createCreditCardInfo(existentCardsNumber)

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
	validateEncrypt(securityCode, card.securityCode, 'cvv')

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
		transactions: sanitizeCardMovement(transactions),
		recharges: sanitizeCardMovement(recharges),
	}
}


const rechargeCard = async ({ cardId, amount, apiKey }) => {
	await validateApiKey(apiKey)
	const card = await validateCardId(cardId)
	validateExpiredCard(card.expirationDate)
	validateBlockCard(card.isBlocked, cardId)

	await rechargeRepository.insert({ cardId, amount })
}


const paymentCard = async ({ cardId, password, businessId, amount }) => {
	const card = await validateCardId(cardId)
	validateExpiredCard(card.expirationDate)
	validateBlockCard(card.isBlocked, cardId)
	validateEncrypt(password, card.password, 'password')
	const business = await validateBusiness(businessId)
	validatePaymentType([card.type, business.type])

	const { balance } = await getCardExtract({ cardId })
	validateSufficientBalance(balance, amount)

	await paymentRepository.insert({ cardId, businessId, amount })
}


const blockCard = async ({ cardId, password }) => {
	const card = await validateCardId(cardId)
	validateExpiredCard(card.expirationDate)
	validateBlockCard(card.isBlocked, cardId)
	validateEncrypt(password, card.password, 'password')

	await cardRepository.update(cardId, {
		...card,
		isBlocked: true
	})
}


const unblockCard = async ({ cardId, password }) => {
	const card = await validateCardId(cardId)
	validateExpiredCard(card.expirationDate)
	validateUnblockCard(card.isBlocked, cardId)
	validateEncrypt(password, card.password, 'password')

	await cardRepository.update(cardId, {
		...card,
		isBlocked: false
	})
}


const validateApiKey = async (apiKey: string) => {
	const company = await companyRepository.findByApiKey(apiKey)

	if (!company) throw new AuthCompanyError('')

	return company
}

const validateEmployee = async (employeeId: number) => {
	const employee = await employeeRepository.findById(employeeId)

	if (!employee) throw new NoFoundIdError(employeeId, 'employee')

	return employee
}

const validateAddCardType = async (cardType: TransactionTypes, employeeId: number) => {
	const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId)
	
	if (card) throw new ExistentCardError(cardType)
}

const getCardNumbers = async () => {
	const existentCards = await cardRepository.find()

	return existentCards.map((card) => card.number)
}

const validateCardId = async (cardId: number) => {
	const card = await cardRepository.findById(cardId)

	if (!card) throw new NoFoundIdError(cardId, 'card')

	return card
}

const validateExpiredCard = (expirationDate: string) => {
	if (isExpiredCard(expirationDate)) throw new ExpiredCardError(expirationDate)
}

const validateFirstRegister = (cardPassword: string | null) => {
	if (cardPassword !== null) throw new CardAlreadyActiveError('')
}

const validateEncrypt = (value: string, hashValue: string, type: string) => {
	if (type === 'cvv') type = 'security code (CVV)'
	if (!isValidEncrypt(value, hashValue)) throw new InvalidEncryptError(type)
}

const validateBusiness = async (businessId: number) => {
	const business = await businessRepository.findById(businessId)

	if (!business) throw new NoFoundIdError(businessId, 'business')

	return business
}

const validatePaymentType = (types: TransactionTypes[]) => {
	const [card, business] = types
	if (card !== business) throw new NoMatchTypesError(card, business)
}

const validateSufficientBalance = (balance: number, amount: number) => {
	if (amount > balance) throw new InsufficientBalanceError(balance, amount)
}

const validateBlockCard = (isBlocked: boolean, cardId: number) => {
	if (isBlocked) throw new BlockCardError(cardId)
}

const validateUnblockCard = (isBlocked: boolean, cardId: number) => {
	if (!isBlocked) throw new UnblockCardError(cardId)
}


export {
	createCard,
	activateCard,
	getCardExtract,
	rechargeCard,
	paymentCard,
	blockCard,
	unblockCard,
}
