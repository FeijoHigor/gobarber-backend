import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne } from 'typeorm'
import User from './User'

@Entity('user_tokens')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Generated('uuid')
    token: string

    @ManyToOne(() => User, user => user.id)
    user_id: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date
}

export default UserToken