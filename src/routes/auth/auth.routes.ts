import express from 'express'

import { SessionController } from '@/controllers/SessionController/session.controller'

const router = express.Router()

router.post('/login', SessionController)

export default router
