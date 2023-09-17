import User from "@modules/users/infra/typeorm/entities/User"
import { hash } from "bcrypt"
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
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    public async execute({ name, email, password}: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if(checkUserExists) {
            throw new AppError(`Email adress already used.`)
        }

        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })
        
        delete user.password
        return user
    }
}

export default CreateUserService