export interface IUserDTO {
  id: number;
  email: string;
  name: string;
  username: string;
  password: string;
  admin: number;
  accessToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}
