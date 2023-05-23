import { Router } from 'express'
import { indexRoute } from '../controllers/index.controller.js'

const router = Router()
router.get('/ping', indexRoute)

export default router
