class NoFoundIdError extends Error {
	status: number

	constructor(id: number, type: string) {
		super('NoFoundIdError')
		this.name = 'NoFoundIdError'
		this.message = `No found ${type} by id '${id}'!`
		this.status = 404
	}
}


export default NoFoundIdError
