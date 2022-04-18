import { Router } from 'express'

import healthRouter from './healthRouter.js'
import cardsRouter from './cardRouter.js'
import rechargesRouter from './rechargeRouter.js'
import purchasesRouter from './purchaseRouter.js'


const router = Router()

router.use('/health', healthRouter)
router.use('/cards', cardsRouter)
router.use('/recharges', rechargesRouter)
router.use('/purchases', purchasesRouter)


export default router
