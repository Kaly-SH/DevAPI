import { IsNotEmpty, IsEmail, MinLength, IsOptional, IsIn } from "class-validator";

export class UsersDto {
    
    @IsNotEmpty()
    @MinLength(3)
    public username: string; 
    
    @IsNotEmpty()
    @IsEmail()
    public email: string; 
    
    @IsNotEmpty()
    @MinLength(8)
    public password: string;
     
    @IsOptional()
    @IsIn(['Employee' , 'Admin' , 'ProjectManager'])
    public role: 'Employee' | 'Admin' | 'ProjectManager';
}

export class SignInDto {

    @IsNotEmpty()
    @IsEmail()
    public email: string; 
    
    @IsNotEmpty()
    @MinLength(8)
    public password: string;

}

