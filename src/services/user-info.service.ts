import axios, { type AxiosInstance } from 'axios';
import type { UserInfoType, SaveUserInfoDtoType } from '@/types/user-info.type';
import { ref } from 'vue';


export class UserInfoService {
  private http: AxiosInstance;
  dataList = ref<UserInfoType[]>([]);

  constructor() {
    this.http = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private async getUserInfoAll(): Promise<UserInfoType[]> {
    const response = await axios.get<UserInfoType[]>('/api/userInfo/findAll');
    return response.data;
  }

  private async saveUserInfo(params: SaveUserInfoDtoType): Promise<UserInfoType> {
    const response = await this.http.post<UserInfoType>('/api/userInfo', params);
    return response.data;
  }

  private async deleteUserInfo(id: number): Promise<void> {
    const response = await this.http.get<void>('/api/userInfo' + id);
    return response.data;
  }

  async requestData(): Promise<UserInfoType[]> {
    try {
      this.dataList.value = await this.getUserInfoAll();
      console.log('Все данные:', this.dataList.value);
    } catch (error) {
      console.error('Не удалось загрузить все данные', error);
    }
    return this.dataList.value;
  }

  async add(params: SaveUserInfoDtoType): Promise<boolean> {
    try {
      const data = ref<UserInfoType>(await this.saveUserInfo({
          "fullName": params.fullName, 
          "blogName": params.blogName
      }));
      console.log('Автор добавлен:', data.value);
      return true;
    } catch (error) {
      console.error('Не удалось добавить автора:', error);
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.deleteUserInfo(id);
      console.log('Автор удален', );
      return true;
    } catch (error) {
      console.error('Не удалось удалить автора:', error);
      return false;
    }
  }
  
  getData(): UserInfoType[] {
    return this.dataList.value;
  }

}

