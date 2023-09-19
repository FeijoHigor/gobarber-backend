import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import UserToken from './UserToken'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({type: 'text', unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(() => Appointment, appointment => appointment.provider_id)
    appointments: Appointment[]

    @OneToMany(() => UserToken, userToken => userToken.id)
    token_id: string

    @Column({ nullable: true, type: 'varchar' })
    avatar: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date
}

export default User