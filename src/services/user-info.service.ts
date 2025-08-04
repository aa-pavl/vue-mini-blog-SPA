import axios, { type AxiosInstance } from 'axios'
import type { UserInfoType, SaveUserInfoDtoType } from '@/types/user-info.type'
import { ref } from 'vue'
import type { PostWithAvtorType } from '@/types/post.type'

export class UserInfoService {
  private http: AxiosInstance
  avtorList = ref<UserInfoType[]>([])
  postList = ref<PostWithAvtorType[]>([])

  constructor() {
    this.http = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private async getUserInfoAll(): Promise<UserInfoType[]> {
    const response = await axios.get<UserInfoType[]>('/api/userInfo/findAll')
    return response.data
  }

  private async saveUserInfo(params: SaveUserInfoDtoType): Promise<UserInfoType> {
    const response = await this.http.post<UserInfoType>('/api/userInfo', params)
    return response.data
  }

  private async deleteUserInfo(id: number): Promise<void> {
    const response = await this.http.delete<void>('/api/userInfo/' + id)
    return response.data
  }

  async requestData(): Promise<UserInfoType[]> {
    try {
      this.avtorList.value = await this.getUserInfoAll()
      this.updatePostList()
      console.log('Данные обновлены.')
    } catch (error) {
      console.error('Не удалось загрузить все данные', error)
    }
    return this.avtorList.value
  }

  async add(params: SaveUserInfoDtoType): Promise<boolean> {
    try {
      const data = ref<UserInfoType>(
        await this.saveUserInfo({
          fullName: params.fullName,
          blogName: params.blogName,
        }),
      )
      console.log('Автор добавлен:', data.value)
      await this.requestData()
      return true
    } catch (error) {
      console.error('Не удалось добавить автора:', error)
      return false
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.deleteUserInfo(id)
      console.log('Автор удален')
      await this.requestData()
      return true
    } catch (error) {
      console.error('Не удалось удалить автора:', error)
      return false
    }
  }

  // TODO: временно вынесены сюда все методы работы с данными
  getAvtorList(): UserInfoType[] {
    return this.avtorList.value
  }

  getAvtorById(id: number): UserInfoType | undefined {
    return this.avtorList.value.find((item) => item.id === id)
  }

  private updatePostList(): void {
    this.postList.value = this.avtorList.value.flatMap((avtor) =>
      avtor.post.map((post) => ({ ...post, avtor: { fullName: avtor.fullName, id: avtor.id } })),
    )
  }

  getPostListAll(): PostWithAvtorType[] | undefined {
    return this.postList.value
  }

  getPostListByAvter(avtor: UserInfoType): PostWithAvtorType[] | undefined {
    return avtor.post.map((post) => ({
      ...post,
      avtor: {
        fullName: avtor.fullName,
        id: avtor.id,
      },
    }))
  }

  getPostListById(id: number): PostWithAvtorType | undefined {
    return this.postList.value.find((item) => item.id === id)
  }
}
