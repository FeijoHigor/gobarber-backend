import { container } from "tsyringe";
import IHashProvider from "./models/IHashProvider";
import BCyptHashProvider from "./implementations/BCryptHashProvider";

container.registerSingleton<IHashProvider>('HashProvider', BCyptHashProvider)