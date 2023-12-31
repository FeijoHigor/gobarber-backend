
import { AppDataSource } from "@shared/infra/typeorm";
import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import ICreateUserDTO from "@modules/users/dto/ICreateUserDTO";
import UserToken from "../entities/UserToken";

// aqui tem acesso ao banco de dados
class UserTokensRepository implements IUserTokensRepository {
    private ormRepository = AppDataSource.getRepository(UserToken)
    
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.ormRepository.findOne({ where: { token }})

        return userToken
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({ user_id })

        await this.ormRepository.save(userToken)
    
        return userToken
    }
}

export default UserTokensRepository