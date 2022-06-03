import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export interface IUserModel {
  firstname?: string
  lastname?: string
  email: string
  password?: string
  resetPasswordToken?: string
  resetPasswordExpires?: number
  createdAt?: Date
  updatedAt?: Date
}

export default interface IIUserTopicModel extends Document, IUserModel {
  generatePasswordReset(): void
}

const schema = new Schema<IUserModel>(
  {
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

schema.pre('save', async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
  }
})

schema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordExpires = Date.now() + 3600000
}

export const UserModel = model<IUserModel>('UserSchema', schema)
