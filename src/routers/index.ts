import { Router } from 'express'

import healthRouter from './healthRouter.js'


const router = Router()

router.use('/health', healthRouter)


export default router
