const errorsName = [
	'AuthCompanyError',
	'BlockCardError',
	'CardAlreadyActiveError',
	'ExistentCardError',
	'ExpiredCardError',
	'InsufficientBalanceError',
	'InvalidEncryptError',
	'InvalidOnlinePaymentError',
	'NoFoundIdError',
	'NoMatchTypesError',
	'SchemaError',
	'UnblockCardError',
]

const isPersonalizedError = (errorName: string) => {
	return errorsName.includes(errorName)
}


export {
	isPersonalizedError,
}
