class NoFoundEmployeeError extends Error {
	status: number

	constructor(employeeId: number) {
		super('NoFoundEmployeeError')
		this.name = 'NoFoundEmployeeError'
		this.message = `No found employee by id '${employeeId}'!`
		this.status = 404
	}
}


export default NoFoundEmployeeError
