import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { UserModel } from '@/models/user.model'
import auth from '@/config/auth'
import httpStatus from 'http-status'

function generateToken(params = {}) {
  return jwt.sign(params, auth.secret, {
    expiresIn: auth.ttl,
  })
}

export async function SessionController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    console.log('REQ +> ', req.body)
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado ' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ message: 'Senha incorreta' })
    }

    return res.json({ user, token: generateToken({ id: user.id }) })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
