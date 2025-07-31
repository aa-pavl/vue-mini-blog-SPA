import type { GetPostDtoType, PostType, SavePostDtoType, UpdatePostDtoType } from '@/types/post.type';
import axios, { type AxiosInstance } from 'axios';


export class PostService {

  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
    //   baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getPost(id: number): Promise<GetPostDtoType> {
    const response = await this.http.post<GetPostDtoType>('/api/post/' + id);
    return response.data;
  }

  async updatePost(params: UpdatePostDtoType): Promise<GetPostDtoType> {
    const response = await this.http.post<GetPostDtoType>('/api/post/', params);
    return response.data;
  }

  async savePost(params: PostType): Promise<SavePostDtoType> {
    const response = await this.http.post<SavePostDtoType>('/api/post', params);
    return response.data;
  }

  async deletePost(id: number): Promise<void> {
    const response = await this.http.get<void>('/api/post' + id);
    return response.data;
  }

}

