import { injectable, inject } from 'tsyringe'

import AppError from "@shared/errors/AppError"
import IUserRepository from "../repositories/IUsersRepository"
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IHashProvider from '../providers/models/IHashProvider'
import User from '../infra/typeorm/entities/User'

interface Request {
    user_id: string
   name: string
   email: string
   old_password?: string
   password?: string
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ user_id, name, email, password, old_password }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if(!user) {
            throw new AppError('User not found', 404)
        }

        const usersRepositoryWithUpdatedEmail = await this.usersRepository.findByEmail(email)

        if(usersRepositoryWithUpdatedEmail && user_id !== usersRepositoryWithUpdatedEmail.id) {
            throw new AppError('Email already in use', 400)
        }

        
        user.name = name
        user.email = email

        
        if(password && !old_password) {
            throw new AppError('You need to inform the old password to set a new password')
        }
        
        if(password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)
    
            if(!checkOldPassword) {
                throw new AppError('Old password does not match', 400)
            }

            user.password = await this.hashProvider.generateHash(password)
        }


        return this.usersRepository.save(user)
    }
}

export default UpdateProfileService