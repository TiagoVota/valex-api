import * as personalizedErrors from '../errors/index.js'


const isPersonalizedError = (errorName: string) => {
	return Boolean(personalizedErrors[errorName])
}


export {
	isPersonalizedError,
}
