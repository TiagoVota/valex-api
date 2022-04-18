class InvalidCvvError extends Error {
	status: number

	constructor(message: string) {
		super(message)
		this.name = 'InvalidCvvError'
		this.message = message || 'Invalid security code (CVV)!'
		this.status = 401
	}
}


export default InvalidCvvError
