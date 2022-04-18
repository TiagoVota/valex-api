import { Router } from 'express'

import healthRouter from './healthRouter.js'
import cardsRouter from './cardsRouter.js'
import rechargesRouter from './rechargesRouter.js'
import purchasesRouter from './purchasesRouter.js'


const router = Router()

router.use('/health', healthRouter)
router.use('/cards', cardsRouter)
router.use('/recharges', rechargesRouter)
router.use('/purchases', purchasesRouter)


export default router
