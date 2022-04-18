class ExpiredCardError extends Error {
	status: number

	constructor(expirationDate: string) {
		super('ExpiredCardError')
		this.name = 'ExpiredCardError'
		this.message = `This card expired at '${expirationDate}'!`
		this.status = 400
	}
}


export default ExpiredCardError
