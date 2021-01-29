export interface IUsuario {
  id: number
  login: string
  password?: string
  empresa?: number
}

export interface IAuth {
  sessao: string
  usuario: IUsuario
  accessToken: string
  refreshToken: string
}

export interface ISessao {
  id: string
  refreshToken: string
  createdAt: string
  client: number
  usuario: number
  platform: string
  os: string
  buildNumber: string
  revoked: boolean
}

export interface IUserResponse {
  usuario: IUsuario
  sessao: string
  accessToken: string
}
