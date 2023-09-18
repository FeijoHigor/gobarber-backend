import { hash, compare } from "bcrypt";
import IHashProvider from "../models/IHashProvider";

export default class BCyptHashProvider implements IHashProvider {  
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8)
    }

    compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed)
    }
}