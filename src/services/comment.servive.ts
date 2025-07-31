import type { CommentType, SaveCommentDtoType } from '@/types/comment.type';
import axios, { type AxiosInstance } from 'axios';


export class CommentService {

  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
    //   baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async saveComment(params: CommentType): Promise<SaveCommentDtoType> {
    const response = await this.http.post<SaveCommentDtoType>('/api/comment', params);
    return response.data;
  }

  async deleteComment(id: number): Promise<void> {
    const response = await this.http.get<void>('/api/comment' + id);
    return response.data;
  }

}

