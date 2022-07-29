import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { IUserDTO } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

export interface IUsersService {
  create(data: CreateUserDTO): Promise<UserEntity>;
  list(skip: number, take: number): Promise<IUserDTO[]>;
  findOne(id: string): Promise<IUserDTO>;
  findByUsername(username: string): Promise<IUserDTO>;
  getUserIdFromAccessToken(sessionToken: string): Promise<string>;
  update(id: string, updateUserDto: UpdateUserDTO): Promise<IUserDTO>;
  destroy(id: string): Promise<boolean>;
}
