import { Repository } from "typeorm"
import User from "../models/User"
import { AppDataSource } from "../database"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface Request {
    email: string
    password: string
}

interface Response {
    user: User
    token: string
}

class AuthenticateUserService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = AppDataSource.getRepository(User)
    }

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findOne({ where: { email } })
    
        if(!user) {
            throw new Error('Incorrect email/password combination.')
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched) {
            throw new Error('Incorrect email/password combination.')
        }

        const token = sign({  }, 'higaodobao', {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService