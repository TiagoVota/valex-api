class InsufficientBalanceError extends Error {
	status: number

	constructor(balance: number, amount: number) {
		super('InsufficientBalanceError')
		this.name = 'InsufficientBalanceError'
		this.message = `The card balance (${balance}) is lower than payment amount (${amount})!`
		this.status = 422
	}
}


export default InsufficientBalanceError
