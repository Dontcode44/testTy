import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
