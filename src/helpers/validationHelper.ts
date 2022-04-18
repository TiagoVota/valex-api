import { stripHtml } from 'string-strip-html'


const sanitizeInput = (body) => {
	Object.keys(body).forEach(property => {
		if (typeof body[property] !== 'number') {
			body[property] = stripHtml(body[property]).result.trim()
		}
	})

	return body
}


export {
	sanitizeInput,
}
