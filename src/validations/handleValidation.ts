const validationErrors = ({ objectToValid, objectValidation }): string | null => {
	const objectError = objectValidation.validate(objectToValid).error

	if (objectError) return objectError.details[0].message
	return null
}


export {
	validationErrors,
}
