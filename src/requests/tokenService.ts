import { IAuth } from './types/types'

class TokenService {
  clearTokens(): void {
    localStorage.removeItem('AuthUser')
  }

  getUsuarioAutenticado(): IAuth {
    const { user } = JSON.parse(
      localStorage.getItem('AuthUser') ||
        '{"user":"{"accessToken: "", "refreshToken":"", "sessao": "", "usuario": "{"id": 0, "login": ""}""}"}'
    )
    return user
  }

  setUsuarioAutenticado(user: IAuth): void {
    localStorage.setItem('AuthUser', JSON.stringify({ user: user }))
  }
}

export default TokenService
