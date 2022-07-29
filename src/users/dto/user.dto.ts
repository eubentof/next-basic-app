export interface IUserDTO {
  id: string;
  email: string;
  name: string;
  username: string;
  password: string;
  accessToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}
