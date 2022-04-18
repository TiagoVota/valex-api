class BlockCardError extends Error {
	status: number

	constructor(cardId: number) {
		super('BlockCardError')
		this.name = 'BlockCardError'
		this.message = `Card id '${cardId}' is blocked!`
		this.status = 401
	}
}


export default BlockCardError

