import 'reflect-metadata'
import express, { NextFunction, Request, Response, json } from 'express';
import 'express-async-errors'
import routes from './routes';

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/infra/typeorm';
import '@shared/container'

const app = express();

AppDataSource.initialize().then(() => {
    app.use(json())
    
    app.use(routes)
    
    app.use('/files', express.static(uploadConfig.directory))

    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        console.log('eitaaa')
        if(err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message
            })
        }

        console.error(err)

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }) 

    app.listen(3333, () => {
        console.log("Server listening on port 3333")
    })
})
