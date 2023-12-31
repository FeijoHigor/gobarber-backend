import User from "@modules/users/infra/typeorm/entities/User"
import IHashProvider from "../providers/models/IHashProvider"
import AppError from "@shared/errors/AppError"
import IUserRepository from "../repositories/IUsersRepository"

import { injectable, inject } from 'tsyringe'

interface Request {
    name: string
    email: string
    password: string
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ name, email, password}: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if(checkUserExists) {
            throw new AppError(`Email adress already used.`)
        }

        const hashedPassword = await this.hashProvider.generateHash(password)
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })
        
        return user
    }
}

export default CreateUserService