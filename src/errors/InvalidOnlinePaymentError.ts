class InvalidOnlinePaymentError extends Error {
	status: number
	
	constructor(message: string) {
		super('InvalidOnlinePaymentError')
		this.name = 'InvalidOnlinePaymentError'
		this.message = message || 'This payment have a invalid employee input data!'
		this.status = 422
	}
}


export default InvalidOnlinePaymentError
