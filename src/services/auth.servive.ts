import type { AuthType } from '@/types/auth.type'
import axios, { type AxiosInstance } from 'axios'

export class AuthService {
  private http: AxiosInstance

  public defaultUsername: string = 'Tchaikovsky'
  public defaultPassword: string = 'Pyotr'

  private isLogged: boolean = false // текущщее состояние

  constructor() {
    this.http = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  private async auth(username: string, password: string): Promise<AuthType> {
    const response = await this.http.post<AuthType>(
      `/auth/login?username=${username}&password=${password}`,
    )
    return response.data
  }

  async login(username: string, password: string): Promise<void> {
    if (this.isLogged) return

    console.log('Запрос на авторизацию...')
    try {
      const loginData = await this.auth(username, password)
      console.log('Вы успешно вошли!', loginData)
      this.isLogged = true
    } catch (error) {
      console.error('Не удалось войти:', error)
      this.isLogged = false
    }
  }

  logout(): void {
    console.log('Вы успешно вышли!')
    this.isLogged = false
  }

  setIsLogged(isLoggedNew: boolean): void {
    this.isLogged = isLoggedNew
  }

  getIsLogged(): boolean {
    return this.isLogged
  }
}
