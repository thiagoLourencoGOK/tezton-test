import express from 'express'

import { SignUpController } from '@/controllers/UserController/signup.controller'

const router = express.Router()

router.post('/signup', SignUpController)

export default router
