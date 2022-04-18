class ExistentCardError extends Error {
	status: number

	constructor(cardType: string) {
		super('ExistentCardError')
		this.name = 'ExistentCardError'
		this.message = `This employee already have a '${cardType}' card type!`
		this.status = 409
	}
}


export default ExistentCardError
