class CardAlreadyBlockedError extends Error {
	status: number

	constructor(cardId: number) {
		super('CardAlreadyBlockedError')
		this.name = 'CardAlreadyBlockedError'
		this.message = `Card id '${cardId}' is already blocked!`
		this.status = 409
	}
}


export default CardAlreadyBlockedError

