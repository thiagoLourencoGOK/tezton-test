import express from 'express'

import user from './user/user.routes'
import auth from './auth/auth.routes'

const router = express.Router()

router.use('/user', user)
router.use(auth)

export default router
