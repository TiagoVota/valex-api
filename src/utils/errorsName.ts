const errorsName = [
	'AuthCompanyError',
	'AuthError',
	'CardAlreadyActiveError',
	'ExistentCardError',
	'ExpiredCardError',
	'InsufficientBalanceError',
	'InvalidEncryptError',
	'NoFoundIdError',
	'NoMatchTypesError',
	'SchemaError',
]

const isPersonalizedError = (errorName: string) => {
	return errorsName.includes(errorName)
}


export {
	isPersonalizedError,
}
