import { Router } from 'express'

import healthRouter from './healthRouter.js'
import cardsRouter from './cardRouter.js'


const router = Router()

router.use('/health', healthRouter)
router.use('/cards', cardsRouter)


export default router
