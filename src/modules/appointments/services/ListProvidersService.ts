import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

interface Request {
    user_id: string
}

@injectable()
class ListProviderService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: Request): Promise<User[]> {
        const users = await this.usersRepository.findAllProviders({ except_user_id: user_id })

        return users
    }
}

export default ListProviderService