import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new Error('JWT token is missing')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verify(token, 'higaodobao')
    
        const { sub } = decoded // as TokenPayload

        request.user = {
            id: sub as string
        }

        return next()
    }catch(err) {
        throw new Error('Invalid JWT token')
    }
}