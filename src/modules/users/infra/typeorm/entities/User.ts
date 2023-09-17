import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

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

    @Column({ nullable: true, type: 'varchar' })
    avatar: string

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date
}

export default User