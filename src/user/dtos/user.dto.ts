import { IsEmail, IsNotEmpty, Min } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    usrId: string;    

    @IsNotEmpty()
    usrNm: string;

    @IsNotEmpty()
    @Min(6)
    usrPwd: string;

    @IsEmail()
    emlAddr: string;
}