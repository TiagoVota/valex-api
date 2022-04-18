class NoFoundCardError extends Error {
	status: number

	constructor(cardId: number) {
		super('NoFoundCardError')
		this.name = 'NoFoundCardError'
		this.message = `No found card by id '${cardId}'!`
		this.status = 404
	}
}


export default NoFoundCardError
