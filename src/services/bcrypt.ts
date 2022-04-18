import bcrypt from 'bcrypt'


const encryptValue = (value: string) => {
	const SALT = 12
	return bcrypt.hashSync(value, SALT)
}


const isValidEncrypt = (value: string, hashValue: string) => {
	return bcrypt.compareSync(value, hashValue)
}


export {
	encryptValue,
	isValidEncrypt,
}
