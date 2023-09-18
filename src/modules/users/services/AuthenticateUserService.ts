import User from "../infra/typeorm/entities/User"
import { sign } from "jsonwebtoken"
import IHashProvider from "../providers/models/IHashProvider"

import AppError from "@shared/errors/AppError"
import IUserRepository from "../repositories/IUsersRepository"

import { injectable, inject } from 'tsyringe'

interface Request {
    email: string
    password: string
}

interface Response {
    user: User
    token: string
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email)
    
        if(!user) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password)

        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const token = sign({  }, 'higaodobao', {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService