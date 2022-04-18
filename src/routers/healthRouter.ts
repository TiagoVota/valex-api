import { Router } from 'express'


const router = Router()

router.get('', (_, res) => res.status(200).send('I\'m alive!'))


export default router
