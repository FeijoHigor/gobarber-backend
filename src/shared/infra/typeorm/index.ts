import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm"

//const port = process.env.DB_PORT as unknown as undefined | number 

// const options: DataSourceOptions & SeederOptions = {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: port,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: [`${__dirname}/**/entities/*.{ts,js}`],
//     migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
// }


const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    // entities: Object.values(entities) as unknown as EntitySchema[], //gerar migration
    // migrations: Object.values(migrations) as unknown as Function[]

    //entities: [`./src/modules/.*/infra/typeorm/entities/*.{ts,js}`], //gerar migration
    // migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
    
    entities: [`./src/modules/**/infra/typeorm/entities/*{.ts,.js}`], //gerar migration
    migrations: [`${__dirname}/migrations/*{.ts,.js}`], //gerar migration
    // entities: [`./src/modules/users/infra/typeorm/entities/*.{ts,js}`, `./src/modules/appointments/infra/typeorm/entities/*.{ts,js}`], //gerar migration
    // migrations: [`${__dirname}/**/migrations/*.{ts,js}`], //gerar migration 
}

export const AppDataSource = new DataSource(options)