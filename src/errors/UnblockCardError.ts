class UnblockCardError extends Error {
	status: number

	constructor(cardId: number) {
		super('UnblockCardError')
		this.name = 'UnblockCardError'
		this.message = `Card id '${cardId}' is already unblocked!`
		this.status = 401
	}
}


export default UnblockCardError

