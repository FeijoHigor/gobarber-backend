import path from 'path'
import fs from 'fs'

import uploadConfig from "@config/upload"
import User from "@modules/users/infra/typeorm/entities/User"

import { injectable, inject } from 'tsyringe'

import AppError from "@shared/errors/AppError"
import IUserRepository from "../repositories/IUsersRepository"

interface Request {
    user_id: string
    avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('Only authenticated users acan change avatar.', 401)
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFileName

        await this.usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService