import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { IUserDTO } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

export interface IUsersService {
  create(data: CreateUserDTO): Promise<UserEntity>;
  list(skip: number, take: number): Promise<IUserDTO[]>;
  findOne(id: number): Promise<IUserDTO>;
  findByUsername(username: string): Promise<IUserDTO>;
  getUserFromAccessToken(acceessToken: string): Promise<IUserDTO>;
  updateAccessToken(id: number, accessToken: string): Promise<IUserDTO>;
  update(id: number, updateUserDto: UpdateUserDTO): Promise<IUserDTO>;
  destroy(id: number): Promise<boolean>;
}
