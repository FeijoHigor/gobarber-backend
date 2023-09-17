
import { AppDataSource } from "@shared/infra/typeorm";
import User from "../entities/User";
import IUserRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dto/ICreateUserDTO";

// aqui tem acesso ao banco de dados
class UsersRepository implements IUserRepository {
    private ormRepository = AppDataSource.getRepository(User)

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: {
            email
        }})

        return user
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: {
            id
        }})

        return user
    }
    
    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData)

        this.ormRepository.save(user)

        return user
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user)
    }
}

export default UsersRepository