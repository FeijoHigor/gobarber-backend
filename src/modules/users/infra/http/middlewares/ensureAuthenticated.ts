import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";

interface ITokenPayload {
    iat: number
    exp: number
    sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError('JWT token is missing', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verify(token, 'higaodobao')
    
        const { sub } = decoded as ITokenPayload // as TokenPayload

        request.user = {
            id: sub as string
        }

        return next()
    }catch(err) {
        throw new AppError('Invalid JWT token', 401)
    }
}