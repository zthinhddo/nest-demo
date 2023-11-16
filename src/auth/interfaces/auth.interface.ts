import { AuthDto } from "../dtos/auth.dto";

export const AUTH_SERVICE = "IAuth";

export interface IAuth {
    signIn(dto: AuthDto): Promise<any>;
}