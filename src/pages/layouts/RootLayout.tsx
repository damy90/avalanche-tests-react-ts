import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import NavBar from "../../common/NavBar"
import { useEffect } from "react"

export function RootLayout() {
  const { user } = useAuth()
  
  //if (user == null) return <Navigate to="/login" />

  return (
    <>
      <NavBar/>
      <div>User: {user}</div>
      <Outlet />
    </>
  )
}
