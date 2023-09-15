import { AppDataSource } from "../database"
import User from "../models/User"
import { Repository } from 'typeorm'
import { hash } from "bcrypt"

interface Request {
    name: string
    email: string
    password: string
}

class CreateUserService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = AppDataSource.getRepository(User)
    }

    public async execute({ name, email, password}: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findOne({
            where: { email },
        })

        if(checkUserExists) {
            throw new Error(`Email adress already used.`)
        }

        const hashedPassword = await hash(password, 8)

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        await this.usersRepository.save(user)
        
        delete user.password
        return user
    }
}

export default CreateUserService