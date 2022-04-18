class InvalidEncryptError extends Error {
	status: number

	constructor(type: string) {
		super('InvalidEncryptError')
		this.name = 'InvalidEncryptError'
		this.message = `Invalid ${type}!`
		this.status = 401
	}
}


export default InvalidEncryptError
