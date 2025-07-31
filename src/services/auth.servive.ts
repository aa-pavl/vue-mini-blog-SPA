import type { CommentType, SaveCommentDtoType } from '@/types/comment.type';
import axios, { type AxiosInstance } from 'axios';


export class CommentService {

  private http: AxiosInstance;
  
  public defaultUsername: string = "Tchaikovsky";
  public defaultPassword: string = 'Pyotr';
  
  private isLogged: boolean = false; // текущщее состояние

  constructor() {
    this.http = axios.create({
    //   baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async login(username: string, password: string): Promise<any> {
    const response = await this.http.post<any>('/login?username=' + username + '&password=' + password);
    return response.data;
  }

  public getIsLoggedIn() {
    return this.isLogged;
  }
}

