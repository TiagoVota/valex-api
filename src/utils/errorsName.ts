const errorsName = [
	'AuthCompanyError',
	'AuthError',
	'CardAlreadyActiveError',
	'ExistentCardError',
	'ExpiredCardError',
	'InvalidCvvError',
	'NoFoundCardError',
	'NoFoundEmployeeError',
	'SchemaError',
]

const isPersonalizedError = (errorName: string) => {
	return errorsName.includes(errorName)
}


export {
	isPersonalizedError,
}
