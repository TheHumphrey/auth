import React, { useEffect } from 'react'

import AuthService from 'auth'

const App = () => {
  const auth = new AuthService('https://wayds.net:8081/authway/api')

  useEffect(() => {
    testAuth()
  }, [])

  const testAuth = async () => {
    await auth
      .emailExists('fernando.lima@waydatasolution.com')
      .then(() => {
        console.log('Email existe!')
      })
      .catch(() => {
        console.log('Email não existe!')
      })

    await auth
      .signInWithUsernameAndPassword('fernando.lima@waydatasolution.com', '123')
      .then((res) => {
        console.log('Logado com sucesso, info do user: ')
        console.log(res)
      })
      .catch((err) => {
        console.log('error: ' + err)
      })

    await auth
      .renew()
      .then(() => {
        console.log('ReNew Funcionou!')
      })
      .catch(() => {
        console.log('ReNew Falhou!')
      })

    await auth
      .signOut()
      .then(() => {
        console.log('signOut Funcionou!')
      })
      .catch(() => {
        console.log('signOut Falhou!')
      })
  }

  return <h1>Testando</h1>
}

export default App
