import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Must be a valid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 35)
  fullName: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
