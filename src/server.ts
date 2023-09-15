import express, { json } from 'express';
import routes from './routes';

import { AppDataSource } from './database';

AppDataSource.initialize().then(() => {
    const app = express();
    
    app.use(json())
    
    app.use(routes)
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    app.listen(3333, () => {
        console.log("Server listening on port 3333")
    })
})
