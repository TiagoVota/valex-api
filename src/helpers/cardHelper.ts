import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'

import { Payment } from '../repositories/paymentRepository'
import { Recharge } from '../repositories/rechargeRepository'


const createCreditCardInfo = () => {
	return {
		cardNumber: faker.finance.creditCardNumber('mastercard'),
		cvv: faker.finance.creditCardCVV(),
	}
}


const makeCardName = (employeeFullName: string) => {
	const upperNameWords = employeeFullName.toUpperCase().split(' ')
	const middleNames = upperNameWords.splice(1, upperNameWords.length - 2)

	const middleNamesSanitized = middleNames
		.filter(name => name !== '')
		.map((name) => `${name[0]}.`)

	const sanitizedNames = [
		upperNameWords[0],
		...middleNamesSanitized,
		upperNameWords[1]
	]

	return sanitizedNames.join(' ')
}


const makeExpirationDate = () => {
	return dayjs().add(5, 'years').format('MM/YY')
}


const isExpiredCard = (expirationDate: string) => {
	const today = dayjs().endOf('month')
	const [month, year] = expirationDate.split('/')
	const expiredDate = dayjs(`${month}/01/${year}`).endOf('month')

	const mothDiference = expiredDate.diff(today, 'month')

	return mothDiference < 0
}


const sanitizeCardMovement = (movementList: Payment[] | Recharge[]) => {
	return movementList.map((movement: Payment | Recharge) => {
		return {
			...movement,
			timestamp: formatDate(movement.timestamp)
		}
	})
}

const formatDate = (timestamp: Date) => {
	return dayjs(timestamp).format('DD/MM/YYYY')
}


const makeCardBalance = (transactions: Payment[], recharges: Recharge[]) => {
	const transactionsBalance = makeBalance(transactions)
	const rechargesBalance = makeBalance(recharges)

	return rechargesBalance - transactionsBalance
}

const makeBalance = (movementList: Payment[] | Recharge[]) => {
	return movementList
		.map(({ amount }: Payment | Recharge) => amount)
		.reduce((amount, total) => amount + total, 0)
}


export {
	createCreditCardInfo,
	makeCardName,
	makeExpirationDate,
	isExpiredCard,
	sanitizeCardMovement,
	makeCardBalance,
}
