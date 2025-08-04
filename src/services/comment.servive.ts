import type { CommentType, SaveCommentDtoType } from '@/types/comment.type'
import axios, { type AxiosInstance } from 'axios'
import { ref } from 'vue'

export class CommentService {
  private http: AxiosInstance

  constructor() {
    this.http = axios.create({
      //   baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private async saveComment(postId: number, params: SaveCommentDtoType): Promise<CommentType> {
    const response = await this.http.post<CommentType>('/api/comment?postId=' + postId, params)
    return response.data
  }

  private async deleteComment(id: number): Promise<void> {
    const response = await this.http.delete<void>('/api/comment/' + id)
    return response.data
  }

  async add(postId: number, params: SaveCommentDtoType): Promise<boolean> {
    try {
      const data = ref<CommentType>(
        await this.saveComment(postId, {
          email: params.email,
          textComment: params.textComment,
          userInfo: params.userInfo,
        }),
      )
      console.log('Комментарий добавлен:', data.value)
      return true
    } catch (error) {
      console.error('Не удалось добавить комментарий', error)
      return false
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.deleteComment(id)
      console.log('Комментарий удален')
      return true
    } catch (error) {
      console.error('Не удалось удалить комментарий:', error)
      return false
    }
  }
}
