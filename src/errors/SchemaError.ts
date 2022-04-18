class SchemaError extends Error {
	status: number

	constructor(message: string) {
		super(message)
		this.name = 'SchemaError'
		this.message = message
		this.status = 422
	}
}


export default SchemaError
