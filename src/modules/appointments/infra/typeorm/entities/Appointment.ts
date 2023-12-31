import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({ name: 'provider_id'})
    provider_id: User

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({ name: 'user_id'})
    user: User

    @Column('timestamp with time zone')
    date: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date
}

export default Appointment