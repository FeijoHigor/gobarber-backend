import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import { container } from 'tsyringe'

export default class UserAvatarController {
    public async update(request: Request, response: Response) {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService)

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })

        delete user.password

        return response.json(user) 
    }
}