const errorsName = [
	'AuthCompanyError',
	'AuthError',
	'ExistentCardError',
	'NoFoundEmployeeError',
	'SchemaError',
]

const isPersonalizedError = (errorName: string) => {
	return errorsName.includes(errorName)
}


export {
	isPersonalizedError,
}
