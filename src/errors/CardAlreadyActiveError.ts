class CardAlreadyActiveError extends Error {
	status: number

	constructor(message: string) {
		super(message)
		this.name = 'CardAlreadyActiveError'
		this.message = 'This card is already active!'
		this.status = 409
	}
}


export default CardAlreadyActiveError
