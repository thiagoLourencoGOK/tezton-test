import { UserModel } from '@/models/user.model'
import { Response, Request, NextFunction } from 'express'
import httpStatus from 'http-status'

export async function SignUpController(req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const { email } = req.body

    const user = await UserModel.findOne({ email })

    if (user) {
      return res.status(403).json({ message: 'Usuário já existe' })
    }

    UserModel.create(req.body)

    return res.json({ message: 'Usuário criado com suceso' })
  } catch (error) {
    if (error.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(error)

    next(error)
  }
}
