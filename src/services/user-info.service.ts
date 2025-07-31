import axios, { type AxiosInstance } from 'axios';
import type { UserInfoType, SaveUserInfoDtoType } from '@/types/user-info.type';


export class InfoUserService {

  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
    //   baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  async getUserInfoAll(): Promise<UserInfoType[]> {
    const response = await axios.get<UserInfoType[]>('/api/userInfo/findAll');
    return response.data;
  }

  async saveUserInfo(params: SaveUserInfoDtoType): Promise<UserInfoType> {
    const response = await this.http.post<UserInfoType>('/api/userInfo', params);
    return response.data;
  }

  async deleteUserInfo(id: number): Promise<void> {
    const response = await this.http.get<void>('/api/userInfo' + id);
    return response.data;
  }

}

