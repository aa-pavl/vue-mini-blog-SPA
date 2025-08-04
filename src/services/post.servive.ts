import type {
  GetPostDtoType,
  PostType,
  SavePostDtoType,
  UpdatePostDtoType,
} from '@/types/post.type'
import axios, { type AxiosInstance } from 'axios'
import { ref } from 'vue'

export class PostService {
  private http: AxiosInstance

  constructor() {
    this.http = axios.create({
      //   baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private async getPostById(id: number): Promise<GetPostDtoType> {
    const response = await this.http.post<GetPostDtoType>('/api/post/' + id)
    return response.data
  }

  private async updatePost(params: UpdatePostDtoType): Promise<PostType> {
    const response = await this.http.post<PostType>('/api/post/', params)
    return response.data
  }

  private async savePost(userId: number, params: SavePostDtoType): Promise<PostType> {
    const response = await this.http.post<PostType>('/api/post?userInfoId=' + userId, params)
    return response.data
  }

  private async deletePost(postId: number): Promise<void> {
    const response = await this.http.delete<void>('/api/post/' + postId)
    return response.data
  }

  async getPost(id: number): Promise<PostType | undefined> {
    let data = ref<PostType>()
    try {
      const data = ref<PostType>(await this.getPostById(id))
      console.log('Пост найден:', data.value)
    } catch (error) {
      console.error('Не удалось найти пост:', error)
    }
    return data.value
  }

  async add(userId: number, params: SavePostDtoType): Promise<boolean> {
    try {
      const data = ref<PostType>(
        await this.savePost(userId, {
          briefDescription: params.briefDescription,
          fullDescription: params.fullDescription,
          title: params.title,
        }),
      )
      console.log('Пост добавлен:', data.value)
      return true
    } catch (error) {
      console.error('Не удалось добавить пост:', error)
      return false
    }
  }

  async update(params: UpdatePostDtoType): Promise<boolean> {
    try {
      const data = ref<PostType>(
        await this.updatePost({
          briefDescription: params.briefDescription,
          fullDescription: params.fullDescription,
          title: params.title,
          id: params.id,
        }),
      )
      console.log('Пост обнавлен:', data.value)
      return true
    } catch (error) {
      console.error('Не удалось обнавить пост:', error)
      return false
    }
  }

  async delete(postId: number): Promise<boolean> {
    try {
      await this.deletePost(postId)
      console.log('Пост удален')
      return true
    } catch (error) {
      console.error('Не удалось удалить пост:', error)
      return false
    }
  }
}
