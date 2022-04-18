import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'

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


export {
	createCreditCardInfo,
	makeCardName,
	makeExpirationDate,
}
