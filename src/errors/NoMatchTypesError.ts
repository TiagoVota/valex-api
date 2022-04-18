import { TransactionTypes } from '../repositories/cardRepository'


class NoMatchTypesError extends Error {
	status: number

	constructor(card: TransactionTypes, business: TransactionTypes) {
		super('NoMatchTypesError')
		this.name = 'NoMatchTypesError'
		this.message = `'${card}' card type no match with '${business}' business type!`
		this.status = 422
	}
}


export default NoMatchTypesError
