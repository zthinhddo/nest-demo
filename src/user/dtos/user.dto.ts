import { IsEmail, IsNotEmpty, IsNumberString, Min } from "class-validator";

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

export class UpdateUserDto {
    @IsNotEmpty()
    usrNm: string;

    @Min(6)
    usrPwd: string;

    @IsEmail()
    emlAddr: string;

    @IsNumberString()
    phnNo: string;

    roleId: string;

    @IsNotEmpty()
    deltFlg: string;
}

export class CreateUsersDto {
    createUsers: CreateUserDto[]
}
