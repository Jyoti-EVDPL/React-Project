import React, { createContext, useState } from 'react'

const AuthContext = createContext(null)
function AuthContext() {
    const [user,setUser] = useState(null)
    
    const login = (user)=>{
        setUser(user)
    }
    const logout=()=>{
        setUser(null)
    }
  return (
    <div>AuthContext</div>
  )
}

export default AuthContext