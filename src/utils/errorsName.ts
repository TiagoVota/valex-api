const errorsName = [
	'AuthError',
	'ExistentLikeError',
	'ExistentFollowError',
	'NoFollowerError',
	'NoLikeError',
	'SchemaError',
]

const isPersonalizedError = (errorName: string) => {
	return errorsName.includes(errorName)
}


export {
	isPersonalizedError,
}
