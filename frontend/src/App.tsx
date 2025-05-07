


interface User{
  name: string
  email: string
  password: string
}

function App() {
  
const user1: User={
  name: "ajay",
  email: "aj@gmail.com",
  password:"12345678"
}
  return (
    <>
       <div>
          <div>{user1.name}</div>
          <div>{user1.email}</div>
          <div>{user1.password}</div>
       </div>
    </>
  )
}

export default App
