import { Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany, JoinColumn } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

@Entity('user_tokens')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    @Generated('uuid')
    token: string

    @Column()
    user_id: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date
}

export default UserToken