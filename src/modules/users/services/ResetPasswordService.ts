import { isAfter, addHours } from 'date-fns'
import AppError from "@shared/errors/AppError"
import IUserRepository from "../repositories/IUsersRepository"
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider"
import IHashProvider from "../providers/models/IHashProvider"
import IUserTokensRepository from "../repositories/IUserTokensRepository"

import { injectable, inject } from 'tsyringe'

interface IRequest {
    token: string
    password: string
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token)

        if(!userToken) {
            throw new AppError('User token does not exists')
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        if(!user) {
            throw new AppError('User does not exists')
        }

        const tokenCreatedAt = userToken.created_at

        const compareDate = addHours(tokenCreatedAt, 2)

        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token has expired')
        }

        user.password = await this.hashProvider.generateHash(password)

        await this.usersRepository.save(user)
    }
}

export default ResetPasswordService