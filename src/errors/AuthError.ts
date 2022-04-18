class AuthError extends Error {
	status: number

	constructor(message: string) {
		super(message)
		this.name = 'AuthError'
		this.message = message || 'Token is not valid!'
		this.status = 401
	}
}


export default AuthError
