import * as Bowser from 'bowser'

import WayTokenService from './tokenService'

import { IAuth, IUserResponse } from './types/types'

export interface Response<T = any> {
  data: T
  status: number
}

const login = '/v1/login'
const logOut = '/v1/sessao/revoke'
const loginExist = '/v1/usuario/loginexists'
const renewurl = '/v1/accesstoken/renew'
const validade = '/v1/accesstoken/validate'

const storageService = new WayTokenService()

class authService {
  urlAuth = ''
  constructor(urlAuth: string) {
    this.urlAuth = urlAuth
  }

  async signInWithUsernameAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    const browser = Bowser.getParser(window.navigator.userAgent)

    const user = {
      email: email,
      password: password,
      platform: browser.getBrowserName(),
      os: browser.getOSName(),
      buildNumber: '1',
      Client: 'GestorWayWeb'
    }

    return await fetch(this.urlAuth + login, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({ 'content-type': 'application/json' }),
      mode: 'cors'
    })
      .then(async (response) => {
        let body: IUserResponse = {
          sessao: '',
          usuario: {
            id: 0,
            login: ''
          },
          accessToken: ''
        }

        if (response.status === 201) {
          await response.json().then((data: IAuth) => {
            const { usuario, sessao, accessToken }: IAuth = data

            body = { usuario, sessao, accessToken }
            storageService.setUsuarioAutenticado(data)
          })

          return Promise.resolve<IUserResponse>(body)
        } else {
          let err: string = ''

          await response.text().then((text: string) => {
            err = text
          })

          return Promise.reject<string>(err)
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  async signOut(): Promise<any> {
    const user = storageService.getUsuarioAutenticado()
    await fetch(this.urlAuth + logOut, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          storageService.clearTokens()
          return Promise.resolve()
        } else {
          return Promise.reject('fail')
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  async emailExists(login: string): Promise<any> {
    await fetch(this.urlAuth + loginExist, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ email: login })
    })
      .then(async (response) => {
        if (response.status === 200) {
          return Promise.resolve()
        } else {
          return Promise.reject<string>(response.status)
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  // setEmpresa() {}

  async renew(): Promise<any> {
    const user = storageService.getUsuarioAutenticado()

    await fetch(this.urlAuth + renewurl, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user)
    })
      .then(async (response) => {
        if (response.status === 200) {
          await response.json().then((data) => {
            const { accessToken, refreshToken }: IAuth = data
            storageService.setUsuarioAutenticado({
              ...user,
              accessToken,
              refreshToken
            })
          })
          return Promise.resolve()
        } else {
          return Promise.reject<string>(response.status)
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  async validateToken(): Promise<any> {
    const user = storageService.getUsuarioAutenticado()
    await fetch(this.urlAuth + validade, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${user.accessToken}`
      })
    })
      .then(async (response) => {
        if (response.status === 200) {
          return Promise.resolve()
        } else {
          return Promise.reject<string>(response.status)
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

export default authService
