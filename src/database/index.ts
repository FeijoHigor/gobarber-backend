import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm";

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
    entities: [`./src/models/*.{ts,js}`], //gerar migration
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
}

export const AppDataSource = new DataSource(options)