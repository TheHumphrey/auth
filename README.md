# AuthService

---

# Install

Install from the command line:

#### NPM

```
npm install @thehumphrey/auth@1.0.0
```

#### Yarn

```
yarn add @thehumphrey/auth@1.0.0
```

Install via package.json:

```
"@thehumphrey/auth": "1.0.0"
```

---

# Fuctions

signInWithUsernameAndPassword( email: string, password: string );

signOut( );

emailExists( email: string );

renew( );

---

# Example

### Import Service and create a instance

```typescript
  import auth from '@thehumphrey/auth';

  const MyComponent = (): ReactElement => {
    const myUrl = "http://localhost:3000"
    const authService = new auth(myUrl);

    return <h1>Hello World<h1/>:
  }
```

### Services functions

#### Email Exist

```typescript
const email = 'teste@gmail.com'
authService
  .loginExists(email)
  .then(() => {
    //your code if request is ok
  })
  .catch((error) => {
    //your code if request if fail
  })
```

#### Login (signInWithUsernameAndPassword)

```typescript
const email = 'teste@gmail.com'
const password = '123'

authService
  .signInWithUsernameAndPassword(email, password)
  .then((response) => {
    //your code if request is ok
  })
  .catch((error) => {
    //your code if request if fail
  })
```

#### SignOut

```typescript
authService
  .signOut()
  .then(() => {
    //your code if request is ok
  })
  .catch((error) => {
    //your code if request if fail
  })
```

#### ReNew

```typescript
authService
  .renew()
  .then(() => {
    //your code if request is ok
  })
  .catch((error) => {
    //your code if request if fail
  })
```
