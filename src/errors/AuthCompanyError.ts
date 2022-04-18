class AuthCompanyError extends Error {
	status: number

	constructor(message: string) {
		super(message)
		this.name = 'AuthCompanyError'
		this.message = message || 'Company token is not valid!'
		this.status = 401
	}
}


export default AuthCompanyError
